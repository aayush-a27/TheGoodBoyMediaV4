import { useEffect, useRef, useState } from 'react';
import './Hero.css';
import { ASSETS } from '../../config/assets';

export default function Hero() {
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={heroRef} className="hero" id="hero">
      {/* Video Background */}
      <div className="hero__video-wrap">
        <video
          className="hero__video"
          src={ASSETS.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="hero__video-overlay" />
      </div>

      {/* Content */}
      <div className={`hero__content ${isLoaded ? 'hero__content--loaded' : ''}`}>
        <div className="hero__label font-mono">
          <span className="hero__label-line" aria-hidden="true" />
          Creative Studio — Est. 2024
        </div>

        <h1 className="hero__title">
          <span className="hero__title-line hero__title-line--1">
            WE MAKE
          </span>
          <span className="hero__title-line hero__title-line--2">
            BRANDS
          </span>
          <span className="hero__title-line hero__title-line--3">
            <em className="hero__title-italic font-heading">impossible</em>
          </span>
          <span className="hero__title-line hero__title-line--4">
            TO IGNORE
          </span>
        </h1>

        <div className="hero__bottom">
          <p className="hero__sub font-mono">
            Strategy + Creativity + Technology + Experimentation
          </p>
          <div className="hero__scroll-hint" aria-hidden="true">
            <span className="hero__scroll-text font-mono">Scroll</span>
            <div className="hero__scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
