import { useEffect, useRef, useCallback, useMemo } from 'react';
import './RepelText.css';

/**
 * RepelText — Reusable interactive typography component.
 *
 * Hover in  → letters repel from cursor position.
 * Hover out → letters magnetically reassemble → brief squeeze → relax.
 *
 * Usage:
 *   <RepelText as="h1" className="hero__title">
 *     YOUR HEADING
 *   </RepelText>
 *
 * Props:
 *   children       — text content (string or React elements)
 *   as             — wrapper element tag (default: 'span')
 *   className      — additional CSS class
 *   intensity      — repel distance multiplier (default: 1)
 *   repelRadius    — max displacement in px (default: 60)
 *   returnSpeed    — reassembly speed 0–1 (default: 0.12)
 *   squeezeAmount  — horizontal compression ratio (default: 0.04)
 *   rotationAmount — max rotation degrees (default: 12)
 *   style          — pass-through style object
 */

/* ── Defaults ── */
const DEFAULTS = {
  intensity: 1,
  repelRadius: 60,
  returnSpeed: 0.12,
  squeezeAmount: 0.04,
  rotationAmount: 12,
};

/* ── Phase enum ── */
const PHASE_IDLE = 0;
const PHASE_REPEL = 1;
const PHASE_RETURN = 2;
const PHASE_SQUEEZE = 3;
const PHASE_RELAX = 4;

/* ── Helpers ── */
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/** Deterministic per-char "randomness" so the effect isn't perfectly uniform */
function charSeed(i) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s); // 0..1
}

/**
 * Recursively extract text from React children.
 * Returns an array of { char, props } where props carries any inherited
 * className / style from wrapper elements (like <em>).
 */
function flattenChildren(children, inherited = {}) {
  const result = [];
  const arr = Array.isArray(children) ? children : [children];

  for (const child of arr) {
    if (child == null || child === false) continue;

    if (typeof child === 'string' || typeof child === 'number') {
      const str = String(child);
      for (const ch of str) {
        result.push({ char: ch, inherited: { ...inherited } });
      }
    } else if (child.props) {
      // React element — inherit its className / style / tag
      const next = {
        ...inherited,
        className: [inherited.className, child.props.className].filter(Boolean).join(' '),
        style: { ...(inherited.style || {}), ...(child.props.style || {}) },
        tag: child.type || inherited.tag,
      };
      flattenChildren(child.props.children, next).forEach((c) => result.push(c));
    }
  }
  return result;
}

export default function RepelText({
  children,
  as: Tag = 'span',
  className = '',
  intensity = DEFAULTS.intensity,
  repelRadius = DEFAULTS.repelRadius,
  returnSpeed = DEFAULTS.returnSpeed,
  squeezeAmount = DEFAULTS.squeezeAmount,
  rotationAmount = DEFAULTS.rotationAmount,
  style,
  ...rest
}) {
  const containerRef = useRef(null);
  const charsRef = useRef([]); // DOM <span> refs for each char
  const phase = useRef(PHASE_IDLE);
  const rafId = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  // Per-char animation state
  const charState = useRef([]); // { x, y, r, targetX, targetY, targetR }
  const squeezeVal = useRef(0);
  const squeezeTarget = useRef(0);

  // Reduced motion
  const prefersReducedMotion = useRef(false);
  // Touch only
  const isTouchOnly = useRef(false);

  /* ── Flatten children into individual characters ── */
  const chars = useMemo(() => flattenChildren(children), [children]);

  /* ── Initialise per-char state ── */
  const initCharState = useCallback(() => {
    charState.current = chars.map(() => ({
      x: 0, y: 0, r: 0,
      targetX: 0, targetY: 0, targetR: 0,
    }));
  }, [chars]);

  /* ── Calculate repel targets based on mouse position ── */
  const calcRepelTargets = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();

    charsRef.current.forEach((el, i) => {
      if (!el || !charState.current[i]) return;
      if (chars[i].char === ' ') return; // don't move spaces

      const rect = el.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const dx = charCenterX - mousePos.current.x;
      const dy = charCenterY - mousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Influence fades with distance from the container center
      const containerW = containerRect.width;
      const maxInfluenceDist = containerW * 0.8;
      const influence = clamp(1 - dist / maxInfluenceDist, 0.15, 1);

      // Direction: push away from cursor
      const angle = Math.atan2(dy, dx);
      const seed = charSeed(i);
      const displacement = repelRadius * intensity * influence;

      const state = charState.current[i];
      state.targetX = clamp(Math.cos(angle) * displacement * (0.7 + seed * 0.6), -repelRadius, repelRadius);
      state.targetY = clamp(Math.sin(angle) * displacement * 0.5 * (0.5 + seed * 0.5), -repelRadius * 0.5, repelRadius * 0.5);
      state.targetR = (seed - 0.5) * rotationAmount * influence * 2;
    });
  }, [chars, intensity, repelRadius, rotationAmount]);

  /* ── Animation loop ── */
  const tick = useCallback(() => {
    const p = phase.current;

    if (p === PHASE_IDLE) {
      rafId.current = null;
      return; // stop loop when idle
    }

    const speed = p === PHASE_REPEL ? 0.18 : p === PHASE_RETURN ? returnSpeed * 2.5 : returnSpeed * 1.2;

    charsRef.current.forEach((el, i) => {
      if (!el || !charState.current[i]) return;
      const s = charState.current[i];

      if (p === PHASE_REPEL) {
        // Lerp toward repel targets
        s.x = lerp(s.x, s.targetX, speed);
        s.y = lerp(s.y, s.targetY, speed);
        s.r = lerp(s.r, s.targetR, speed);
      } else if (p === PHASE_RETURN || p === PHASE_SQUEEZE || p === PHASE_RELAX) {
        // Lerp back to origin
        const returnLerp = p === PHASE_RETURN ? 0.28 : 0.15;
        s.x = lerp(s.x, 0, returnLerp);
        s.y = lerp(s.y, 0, returnLerp);
        s.r = lerp(s.r, 0, returnLerp);
      }

      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.r}deg)`;
    });

    // Squeeze logic
    if (p === PHASE_SQUEEZE) {
      squeezeVal.current = lerp(squeezeVal.current, squeezeTarget.current, 0.25);
      if (containerRef.current) {
        containerRef.current.style.letterSpacing = `${squeezeVal.current}em`;
      }
      // Check if squeeze reached target
      if (Math.abs(squeezeVal.current - squeezeTarget.current) < 0.002) {
        phase.current = PHASE_RELAX;
        squeezeTarget.current = 0;
      }
    } else if (p === PHASE_RELAX) {
      squeezeVal.current = lerp(squeezeVal.current, 0, 0.12);
      if (containerRef.current) {
        containerRef.current.style.letterSpacing = `${squeezeVal.current}em`;
      }
      // Check if everything is back to normal
      const allSettled = charState.current.every(
        (s) => Math.abs(s.x) < 0.3 && Math.abs(s.y) < 0.3 && Math.abs(s.r) < 0.2
      );
      if (allSettled && Math.abs(squeezeVal.current) < 0.001) {
        // Snap to perfect zero
        charsRef.current.forEach((el, i) => {
          if (!el) return;
          el.style.transform = '';
          if (charState.current[i]) {
            charState.current[i].x = 0;
            charState.current[i].y = 0;
            charState.current[i].r = 0;
          }
        });
        if (containerRef.current) {
          containerRef.current.style.letterSpacing = '';
        }
        squeezeVal.current = 0;
        phase.current = PHASE_IDLE;
        rafId.current = null;
        return;
      }
    }

    // Check return → squeeze transition
    if (p === PHASE_RETURN) {
      const closeEnough = charState.current.every(
        (s) => Math.abs(s.x) < 3 && Math.abs(s.y) < 3
      );
      if (closeEnough) {
        phase.current = PHASE_SQUEEZE;
        squeezeTarget.current = -squeezeAmount;
      }
    }

    rafId.current = requestAnimationFrame(tick);
  }, [returnSpeed, squeezeAmount]);

  /* ── Start loop if not running ── */
  const ensureLoop = useCallback(() => {
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  /* ── Event handlers ── */
  const onPointerMove = useCallback((e) => {
    if (prefersReducedMotion.current || isTouchOnly.current) return;
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;

    if (isHovering.current && phase.current === PHASE_REPEL) {
      calcRepelTargets();
    }
  }, [calcRepelTargets]);

  const onPointerEnter = useCallback((e) => {
    if (prefersReducedMotion.current || isTouchOnly.current) return;
    isHovering.current = true;
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;
    phase.current = PHASE_REPEL;
    calcRepelTargets();
    ensureLoop();
  }, [calcRepelTargets, ensureLoop]);

  const onPointerLeave = useCallback(() => {
    if (prefersReducedMotion.current || isTouchOnly.current) return;
    isHovering.current = false;
    // Set all targets to zero for the return
    charState.current.forEach((s) => {
      s.targetX = 0;
      s.targetY = 0;
      s.targetR = 0;
    });
    phase.current = PHASE_RETURN;
    ensureLoop();
  }, [ensureLoop]);

  /* ── Effects ── */
  useEffect(() => {
    initCharState();

    // Touch detection
    const mqTouch = window.matchMedia('(hover: hover) and (pointer: fine)');
    isTouchOnly.current = !mqTouch.matches;

    // Reduced motion detection
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mqMotion.matches;
    const onMotionChange = () => { prefersReducedMotion.current = mqMotion.matches; };
    mqMotion.addEventListener('change', onMotionChange);

    return () => {
      mqMotion.removeEventListener('change', onMotionChange);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [initCharState]);

  /* ── Render ── */
  return (
    <Tag
      ref={containerRef}
      className={`repel-text ${className}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      style={style}
      {...rest}
    >
      {/* Accessible hidden text for screen readers */}
      <span className="repel-text__sr-only">
        {chars.map((c) => c.char).join('')}
      </span>

      {/* Visual chars — aria-hidden so no double-read */}
      <span className="repel-text__visual" aria-hidden="true">
        {chars.map((c, i) => {
          const isSpace = c.char === ' ';
          const InlineTag = c.inherited.tag === 'em' ? 'em' : 'span';

          return (
            <InlineTag
              key={i}
              ref={(el) => { charsRef.current[i] = el; }}
              className={`repel-text__char ${isSpace ? 'repel-text__char--space' : ''} ${c.inherited.className || ''}`}
              style={c.inherited.style}
            >
              {isSpace ? '\u00A0' : c.char}
            </InlineTag>
          );
        })}
      </span>
    </Tag>
  );
}
