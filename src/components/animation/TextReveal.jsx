import { useEffect, useRef } from 'react';
import './TextReveal.css';

export default function TextReveal({ children, className = '' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Split text into words
    const textContent = container.textContent;
    const words = textContent.split(/\s+/);
    container.innerHTML = '';

    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'text-reveal__word';
      span.textContent = word;
      span.style.transitionDelay = `${i * 0.02}s`;
      container.appendChild(span);

      // Add space between words
      if (i < words.length - 1) {
        const space = document.createTextNode(' ');
        container.appendChild(space);
      }
    });

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const wordElements = container.querySelectorAll('.text-reveal__word');

      wordElements.forEach((word) => {
        const wordRect = word.getBoundingClientRect();
        const wordCenter = wordRect.top + wordRect.height / 2;

        // Calculate how far through the viewport this word is
        const progress = 1 - (wordCenter - viewportHeight * 0.3) / (viewportHeight * 0.5);
        const clampedProgress = Math.max(0, Math.min(1, progress));

        word.style.opacity = 0.15 + clampedProgress * 0.85;
        word.style.color = clampedProgress > 0.5
          ? 'var(--color-text-primary)'
          : 'var(--color-light-gray)';
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [children]);

  return (
    <div ref={containerRef} className={`text-reveal ${className}`}>
      {children}
    </div>
  );
}
