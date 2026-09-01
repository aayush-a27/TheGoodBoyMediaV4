import { memo } from 'react';
import './HorizontalMarquee.css';

const HorizontalMarquee = memo(function HorizontalMarquee({
  children,
  speed = 30,
  direction = 'left',
  className = '',
  separator = '—',
  repeat = 4,
}) {
  const content = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className="marquee__item">
      {children}
      <span className="marquee__separator" aria-hidden="true">{separator}</span>
    </span>
  ));

  const style = {
    '--marquee-duration': `${speed}s`,
    '--marquee-direction': direction === 'right' ? 'reverse' : 'normal',
  };

  return (
    <div className={`marquee ${className}`} style={style} aria-hidden="true">
      <div className="marquee__track">
        <div className="marquee__content">{content}</div>
        <div className="marquee__content" aria-hidden="true">{content}</div>
      </div>
    </div>
  );
});

export default HorizontalMarquee;
