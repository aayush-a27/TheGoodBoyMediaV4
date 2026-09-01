import { useState, useEffect, useCallback, useRef } from 'react';
import './MouseFollower.css';

export default function MouseFollower() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const followerRef = useRef(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('touchstart', () => setIsTouch(true), { once: true });
  }, []);

  const animate = useCallback(() => {
    setPosition((prev) => ({
      x: prev.x + (targetRef.current.x - prev.x) * 0.12,
      y: prev.y + (targetRef.current.y - prev.y) * 0.12,
    }));
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setHoverText(target.getAttribute('data-cursor'));
      } else {
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, isVisible, animate]);

  if (isTouch) return null;

  return (
    <div
      ref={followerRef}
      className={`mouse-follower ${hoverText ? 'mouse-follower--active' : ''} ${isVisible ? 'mouse-follower--visible' : ''}`}
      style={{
        transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
      }}
      aria-hidden="true"
    >
      {hoverText && <span className="mouse-follower__text">{hoverText}</span>}
    </div>
  );
}
