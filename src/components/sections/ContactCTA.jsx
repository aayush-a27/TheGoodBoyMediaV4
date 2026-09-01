import { Link } from 'react-router-dom';
import TornEdge from '../ui/TornEdge';
import MagneticButton from '../ui/MagneticButton';
import './ContactCTA.css';

export default function ContactCTA() {
  return (
    <section className="contact-cta" id="contact-cta">
      <TornEdge position="top" color="var(--color-charcoal)" />

      <div className="contact-cta__inner container">
        <div className="contact-cta__content">
          <span className="contact-cta__label font-mono">05 — Let's Talk</span>

          <h2 className="contact-cta__title">
            Got a <em className="font-heading">good</em> idea?
          </h2>

          <p className="contact-cta__sub">
            We're always looking for the next project that makes us lose sleep
            — in the best way. If you have a brand that needs to be impossible
            to ignore, we should talk.
          </p>

          <div className="contact-cta__actions">
            <MagneticButton className="magnetic-btn--large" href="/contact">
              Start a Project
            </MagneticButton>

            <a href="mailto:hello@thegoodboymed.ia" className="contact-cta__email" data-cursor="OPEN">
              hello@thegoodboymed.ia
            </a>
          </div>
        </div>

        <div className="contact-cta__decoration" aria-hidden="true">
          <svg viewBox="0 0 300 300" fill="none" className="contact-cta__star">
            <path
              d="M150 0 L165 135 L300 150 L165 165 L150 300 L135 165 L0 150 L135 135 Z"
              fill="var(--color-mustard)"
              opacity="0.15"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
