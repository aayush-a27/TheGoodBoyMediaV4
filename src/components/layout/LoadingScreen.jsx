import { useState, useEffect } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | exit

  useEffect(() => {
    let raf;
    let start = null;
    const duration = 2800;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / duration, 1);
      // Eased progress
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setPhase('exit');
        setTimeout(() => {
          onComplete?.();
        }, 800);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${phase === 'exit' ? 'loading-screen--exit' : ''}`}>
      <div className="loading-screen__bg" aria-hidden="true" />

      <div className="loading-screen__content">
        <div className="loading-screen__brand">
          <h1 className="loading-screen__title">
            <span className="loading-screen__title-line">THE GOOD BOY</span>
            <span className="loading-screen__title-sub">MEDIA</span>
          </h1>
        </div>

        <div className="loading-screen__progress">
          <div className="loading-screen__bar-track">
            <div
              className="loading-screen__bar-fill"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <span className="loading-screen__percent font-mono">
            {String(progress).padStart(3, '0')}
          </span>
        </div>

        {/* Decorative SVG line drawing */}
        <svg
          className="loading-screen__decoration"
          viewBox="0 0 400 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            className="loading-screen__draw-path"
            d="M0 20 C30 5, 60 35, 100 20 C140 5, 170 35, 200 20 C230 5, 260 35, 300 20 C340 5, 370 35, 400 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
