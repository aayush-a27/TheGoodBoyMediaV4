import { useEffect, useRef, useCallback } from 'react';
import './EyeLogo.css';

/**
 * A single interactive eye that replaces an "O" in the logo.
 * The white sclera stays fixed; the black pupil follows the cursor.
 */
function Eye({ pupilRef }) {
  return (
    <span className="eye-logo__eye" aria-hidden="true">
      <span className="eye-logo__sclera">
        <span className="eye-logo__pupil" ref={pupilRef} />
      </span>
    </span>
  );
}

/**
 * EyeLogo — THE G👁👁D BOY MEDIA
 *
 * Renders the brand wordmark with the two O's in "GOOD" replaced
 * by interactive eyes whose pupils track the user's mouse across
 * the entire viewport.
 *
 * Performance: uses refs + requestAnimationFrame + direct style
 * mutation. Zero React re-renders on pointer movement.
 */
export default function EyeLogo() {
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const isPointerInside = useRef(true);
  const rafId = useRef(null);
  const prefersReducedMotion = useRef(false);

  // ── Pointer tracking ──────────────────────────────────────
  const handlePointerMove = useCallback((e) => {
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;
    isPointerInside.current = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    isPointerInside.current = false;
  }, []);

  // ── Pupil position calculation ─────────────────────────────
  const updatePupil = useCallback((pupilEl, targetX, targetY) => {
    if (!pupilEl) return;

    const sclera = pupilEl.parentElement;
    if (!sclera) return;

    const rect = sclera.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = targetX - centerX;
    const dy = targetY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Maximum pupil travel = sclera radius minus pupil radius
    const scleraRadius = rect.width / 2;
    const pupilRadius = pupilEl.offsetWidth / 2;
    const maxTravel = scleraRadius - pupilRadius;

    if (distance === 0) {
      pupilEl.style.transform = 'translate(0px, 0px)';
      return;
    }

    // Normalize direction and clamp to maxTravel
    const normX = dx / distance;
    const normY = dy / distance;
    const clampedDist = Math.min(distance, maxTravel);

    const translateX = normX * clampedDist;
    const translateY = normY * clampedDist;

    pupilEl.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }, []);

  // ── Animation loop ─────────────────────────────────────────
  useEffect(() => {
    // Check reduced-motion preference
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mql.matches;

    const onMotionChange = (e) => {
      prefersReducedMotion.current = e.matches;
    };
    mql.addEventListener('change', onMotionChange);

    // Attach pointer listeners
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    const lerpFactor = 0.08; // Subtle organic lag

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      // If reduced motion: center the pupils
      if (prefersReducedMotion.current) {
        if (leftPupilRef.current) leftPupilRef.current.style.transform = 'translate(0px, 0px)';
        if (rightPupilRef.current) rightPupilRef.current.style.transform = 'translate(0px, 0px)';
        rafId.current = requestAnimationFrame(animate);
        return;
      }

      // Target: mouse position or viewport center (when pointer has left)
      const targetX = isPointerInside.current ? mousePos.current.x : window.innerWidth / 2;
      const targetY = isPointerInside.current ? mousePos.current.y : window.innerHeight / 2;

      // Smooth interpolation
      currentPos.current.x = lerp(currentPos.current.x, targetX, lerpFactor);
      currentPos.current.y = lerp(currentPos.current.y, targetY, lerpFactor);

      updatePupil(leftPupilRef.current, currentPos.current.x, currentPos.current.y);
      updatePupil(rightPupilRef.current, currentPos.current.x, currentPos.current.y);

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      mql.removeEventListener('change', onMotionChange);
    };
  }, [handlePointerMove, handlePointerLeave, updatePupil]);

  return (
    <span className="eye-logo" aria-label="THE GOOD BOY MEDIA">
      <span className="eye-logo__line">
        <span className="eye-logo__text">THE </span>
        <span className="eye-logo__word-good">
          <span className="eye-logo__text">G</span>
          <Eye pupilRef={leftPupilRef} />
          <Eye pupilRef={rightPupilRef} />
          <span className="eye-logo__text">D</span>
        </span>
        <span className="eye-logo__text"> BOY</span>
      </span>
      <span className="eye-logo__sub">MEDIA</span>
    </span>
  );
}
