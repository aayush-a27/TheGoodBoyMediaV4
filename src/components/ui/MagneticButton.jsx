import { useRef, useState, useCallback } from 'react';
import './MagneticButton.css';

export default function MagneticButton({ children, className = '', href, onClick, strength = 0.3 }) {
  const btnRef = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setTransform({ x, y });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 });
  }, []);

  const style = {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
  };

  const Tag = href ? 'a' : 'button';
  const extraProps = href ? { href } : {};

  return (
    <Tag
      ref={btnRef}
      className={`magnetic-btn ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...extraProps}
    >
      <span className="magnetic-btn__text">{children}</span>
      <span className="magnetic-btn__bg" aria-hidden="true" />
    </Tag>
  );
}
