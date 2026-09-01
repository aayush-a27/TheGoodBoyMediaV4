import { useEffect, useRef } from 'react';
import './PencilDraw.css';

export default function PencilDraw({ className = '' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll('.pencil-path');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            paths.forEach((path, i) => {
              const length = path.getTotalLength();
              path.style.strokeDasharray = length;
              path.style.strokeDashoffset = length;
              path.style.animation = `drawStroke 2s ${i * 0.3}s ease forwards`;
              path.style.setProperty('--stroke-length', length);
            });
          } else {
            // Reverse: reset when out of view
            paths.forEach((path) => {
              const length = path.getTotalLength();
              path.style.strokeDashoffset = length;
              path.style.animation = 'none';
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`pencil-draw ${className}`}
      viewBox="0 0 600 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hand-drawn squiggle line */}
      <path
        className="pencil-path"
        d="M20 100 C60 30, 100 170, 140 100 C180 30, 220 170, 260 100 C300 30, 340 170, 380 100 C420 30, 460 170, 500 100 C540 30, 580 100, 580 100"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Underline flourish */}
      <path
        className="pencil-path"
        d="M50 150 Q150 130, 300 145 Q450 160, 550 140"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Small star/asterisk */}
      <path
        className="pencil-path"
        d="M530 50 L540 30 M530 50 L550 50 M530 50 L540 70 M530 50 L510 50 M530 50 L520 30 M530 50 L520 70"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Circle flourish */}
      <path
        className="pencil-path"
        d="M70 60 C70 40, 100 40, 100 60 C100 80, 70 80, 70 60"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
