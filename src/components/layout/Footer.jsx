import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const containerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const artworkRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || window.innerWidth < 768) return;
      
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20; // max 10px shift
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      if (wordmarkRef.current) {
        wordmarkRef.current.style.transform = `translate(${xPos * -1}px, ${yPos * -1}px) rotate(-3deg) scale(1.1)`;
      }
      
      if (artworkRef.current) {
        artworkRef.current.style.transform = `translate(${xPos * 1.5}px, ${yPos * 1.5}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <footer className="footer-v2" ref={containerRef}>
      {/* 1. TOP INFORMATION BAR */}
      <div className="footer-v2__top-bar">
        <div className="footer-v2__top-brand font-display">THE GOOD BOY</div>
        <div className="footer-v2__top-status font-mono">
          <span className="status-dot"></span> OPEN (10–6PM)
        </div>
        <div className="footer-v2__top-location font-mono">
          LONDON, ENGLAND
        </div>
        <div className="footer-v2__top-nav font-mono">
          <Link to="/" className="nav-item"><span className="status-dot"></span> HOME</Link>
          <Link to="/works" className="nav-item">WORK</Link>
          <span className="nav-item">ENTERTAINMENT</span>
          <Link to="/blogs" className="nav-item">ABOUT</Link>
          <span className="nav-item">FEED</span>
          <span className="nav-item">PODCAST</span>
          <Link to="/contact" className="nav-item">CONTACT</Link>
          <span className="nav-item">SHOP</span>
        </div>
      </div>

      {/* 2. OVERSIZED TYPOGRAPHY */}
      <div className="footer-v2__oversized">
        <div className="footer-v2__oversized-wordmark font-display" ref={wordmarkRef}>
          THE GOOD BOY
        </div>
      </div>

      {/* 3. MAIN RED BACKGROUND */}
      <div className="footer-v2__main">
        {/* ARTWORK (ABSOLUTE POSITIONED) */}
        <div className="footer-v2__artwork" ref={artworkRef}>
          <img src="/assets/footer-character.png" alt="The Good Boy Character" />
        </div>

        <div className="footer-v2__grid container">
          {/* COLUMN 1: CONTACT */}
          <div className="footer-v2__col footer-v2__col--contact">
            <span className="footer-v2__label font-mono">/ REACH OUT</span>
            <a href="mailto:info@thegoodboystudio.com" className="footer-v2__contact-link font-display">
              info@thegoodboystudio.com
            </a>
            <span className="footer-v2__contact-phone font-display">/ 44 (0)20 30020224</span>
          </div>

          {/* COLUMN 2: ARTWORK SPACE */}
          <div className="footer-v2__col footer-v2__col--artwork-space"></div>

          {/* COLUMN 3: ADDRESS */}
          <div className="footer-v2__col footer-v2__col--address">
            <span className="footer-v2__label font-mono">/ FIND US</span>
            <address className="footer-v2__address font-body">
              The Good Boy Studio<br/>
              Studio 01<br/>
              De Beauvoir Block, 92–96<br/>
              De Beauvoir Road<br/>
              London, N1 4EN
            </address>
          </div>

          {/* RIGHT COLUMN (Social & Nav) */}
          <div className="footer-v2__col footer-v2__col--links">
            <div className="footer-v2__link-group">
              <span className="footer-v2__label font-mono">/ SOCIAL</span>
              <ul className="footer-v2__list font-body">
                <li><a href="#">YouTube</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">TikTok</a></li>
                <li><a href="#">X</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
            
            <div className="footer-v2__link-group">
              <span className="footer-v2__label font-mono">/ NAV</span>
              <ul className="footer-v2__list font-body">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/works">Work</Link></li>
                <li><a href="#">Entertainment</a></li>
                <li><Link to="/blogs">About</Link></li>
                <li><a href="#">Feed</a></li>
                <li><a href="#">Podcast</a></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><a href="#">Shop</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. NEWSLETTER */}
        <div className="footer-v2__newsletter container">
          <div className="footer-v2__newsletter-inner">
            <h3 className="footer-v2__newsletter-title font-display">Newsletter</h3>
            <span className="footer-v2__newsletter-arrow">➔</span>
          </div>
          <hr className="footer-v2__divider" />
        </div>

        {/* 5. COPYRIGHT */}
        <div className="footer-v2__copyright container">
          <span className="font-mono">© THE GOOD BOY {new Date().getFullYear()}</span>
          <span className="font-mono">/ SITE CREDITS / PRIVACY / UP</span>
        </div>
      </div>
    </footer>
  );
}
