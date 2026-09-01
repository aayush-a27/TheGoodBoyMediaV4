import { Link } from 'react-router-dom';
import HorizontalMarquee from '../animation/HorizontalMarquee';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__marquee">
        <HorizontalMarquee speed={40} className="marquee--small">
          THE GOOD BOY MEDIA
        </HorizontalMarquee>
      </div>

      <div className="footer__inner container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-text">THE GOOD BOY</span>
              <span className="footer__logo-sub">MEDIA</span>
            </div>
            <p className="footer__tagline">
              Making brands impossible to ignore since day one.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer__col">
            <h4 className="footer__col-title">Navigate</h4>
            <ul className="footer__col-links">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/works" className="footer__link">Works</Link></li>
              <li><Link to="/blogs" className="footer__link">Blogs</Link></li>
              <li><Link to="/members" className="footer__link">Members</Link></li>
              <li><Link to="/contact" className="footer__link">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            <ul className="footer__col-links">
              <li><span className="footer__link">Strategy</span></li>
              <li><span className="footer__link">Design</span></li>
              <li><span className="footer__link">Development</span></li>
              <li><span className="footer__link">3D & Motion</span></li>
              <li><span className="footer__link">Experiments</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Connect</h4>
            <ul className="footer__col-links">
              <li><a href="mailto:hello@thegoodboymed.ia" className="footer__link">hello@thegoodboymed.ia</a></li>
              <li><a href="#" className="footer__link">Instagram</a></li>
              <li><a href="#" className="footer__link">Twitter / X</a></li>
              <li><a href="#" className="footer__link">LinkedIn</a></li>
              <li><a href="#" className="footer__link">Behance</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright font-mono">
            © {new Date().getFullYear()} The Good Boy Media. All rights reserved.
          </p>
          <p className="footer__credit font-mono">
            Designed & Built with obsessive attention to detail.
          </p>
        </div>
      </div>
    </footer>
  );
}
