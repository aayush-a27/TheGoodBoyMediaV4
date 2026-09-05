import { useEffect, useRef, useState } from 'react';
import './Hero.css';
import { ASSETS } from '../../config/assets';
import RepelText from '../animation/RepelText';

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
            <RepelText intensity={1} repelRadius={55}>
              WE MAKE
            </RepelText>
          </span>
          <span className="hero__title-line hero__title-line--2">
            <RepelText intensity={1} repelRadius={55}>
              BRANDS
            </RepelText>
          </span>
          <span className="hero__title-line hero__title-line--3">
            <RepelText intensity={0.9} repelRadius={50}>
              <em className="hero__title-italic font-heading">impossible</em>
            </RepelText>
          </span>
          <span className="hero__title-line hero__title-line--4">
            <RepelText intensity={1} repelRadius={55}>
              TO IGNORE
            </RepelText>
          </span>
        </h1>

        <p className="hero__description">
          We help brands connect with people through strategy, storytelling and video
        </p>

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
