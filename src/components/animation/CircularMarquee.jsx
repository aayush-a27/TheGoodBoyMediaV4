import { memo } from 'react';
import './CircularMarquee.css';

const CircularMarquee = memo(function CircularMarquee({
  text = 'GOOD IDEAS • GOOD DESIGN • GOOD DIGITAL • GOOD PEOPLE • ',
  size = 280,
  className = '',
}) {
  const chars = text.split('');
  const totalAngle = 360;
  const anglePerChar = totalAngle / chars.length;

  return (
    <div
      className={`circular-marquee ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="circular-marquee__spinner">
        {chars.map((char, i) => (
          <span
            key={i}
            className="circular-marquee__char"
            style={{
              transform: `rotate(${i * anglePerChar}deg)`,
              transformOrigin: `0 ${size / 2}px`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
});

export default CircularMarquee;
