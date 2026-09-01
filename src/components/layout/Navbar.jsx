import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { path: '/works', label: 'Works' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/members', label: 'Members' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header ref={navRef} className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${isOpen ? 'navbar--open' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Home">
          <span className="navbar__logo-text">THE GOOD BOY</span>
          <span className="navbar__logo-sub">MEDIA</span>
        </Link>

        <nav className="navbar__nav" id="main-nav" role="navigation" aria-label="Main navigation">
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.path} className="navbar__item">
                <Link
                  to={link.path}
                  className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                >
                  <span className="navbar__link-text">{link.label}</span>
                  <span className="navbar__link-line" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={`navbar__toggle ${isOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="navbar__toggle-line" />
          <span className="navbar__toggle-line" />
          <span className="navbar__toggle-line" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${isOpen ? 'navbar__mobile--open' : ''}`} id="mobile-nav">
        <nav className="navbar__mobile-nav" role="navigation" aria-label="Mobile navigation">
          <ul className="navbar__mobile-links">
            {navLinks.map((link, i) => (
              <li
                key={link.path}
                className="navbar__mobile-item"
                style={{ transitionDelay: `${0.1 + i * 0.05}s` }}
              >
                <Link
                  to={link.path}
                  className={`navbar__mobile-link ${location.pathname === link.path ? 'navbar__mobile-link--active' : ''}`}
                >
                  <span className="navbar__mobile-num font-mono">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="navbar__mobile-footer">
          <p className="font-mono" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase' }}>
            Strategy + Creativity + Technology
          </p>
        </div>
      </div>
    </header>
  );
}
