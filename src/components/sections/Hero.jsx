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


      {/* Content */}
      <div className={`hero__content ${isLoaded ? 'hero__content--loaded' : ''}`}>

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
          <div className="hero__scroll-hint" aria-hidden="true">
            <span className="hero__scroll-text font-mono">Scroll</span>
            <div className="hero__scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
