import { useState } from 'react';
import MagneticButton from '../components/ui/MagneticButton';
import TornEdge from '../components/ui/TornEdge';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const projectTypes = [
    'Brand Identity',
    'Web Design & Development',
    'Campaign',
    'Social Media & Content',
    '3D / Visual Experience',
    'Creative Strategy',
    'Something Else',
  ];

  return (
    <div className="page-wrapper">
      <section className="contact-hero">
        <div className="contact-hero__inner container">
          <span className="contact-hero__label font-mono">Get In Touch</span>
          <h1 className="contact-hero__title">
            Let's make<br />
            something <em className="font-heading">impossible</em><br />
            to ignore.
          </h1>
        </div>
      </section>

      <section className="contact-content container">
        <div className="contact-grid">
          {/* Info Side */}
          <div className="contact-info">
            <div className="contact-info__block">
              <h3 className="contact-info__title font-mono">Email</h3>
              <a href="mailto:hello@thegoodboymed.ia" className="contact-info__link">
                hello@thegoodboymed.ia
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__title font-mono">Phone</h3>
              <a href="tel:+1234567890" className="contact-info__link">
                +1 (234) 567-890
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__title font-mono">Location</h3>
              <p className="contact-info__text">
                Somewhere creative.<br />
                Probably caffeinated.
              </p>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__title font-mono">Social</h3>
              <div className="contact-info__socials">
                <a href="#" className="contact-info__social">Instagram</a>
                <a href="#" className="contact-info__social">Twitter / X</a>
                <a href="#" className="contact-info__social">LinkedIn</a>
                <a href="#" className="contact-info__social">Behance</a>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <h2 className="contact-success__title font-display">
                  Got it. ✦
                </h2>
                <p className="contact-success__text">
                  We'll be in touch within 24 hours. In the meantime,
                  you can stalk our work.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form__group">
                  <label className="contact-form__label font-mono" htmlFor="contact-name">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    className="contact-form__input"
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-form__group">
                  <label className="contact-form__label font-mono" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="contact-form__input"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-form__group">
                  <label className="contact-form__label font-mono" htmlFor="contact-company">
                    Company
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    className="contact-form__input"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form__group">
                  <label className="contact-form__label font-mono" htmlFor="contact-type">
                    Project Type
                  </label>
                  <select
                    id="contact-type"
                    name="projectType"
                    className="contact-form__input contact-form__select"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="contact-form__group">
                  <label className="contact-form__label font-mono" htmlFor="contact-message">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="contact-form__input contact-form__textarea"
                    placeholder="The more detail, the better. We love a good brief."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <MagneticButton className="magnetic-btn--inverted magnetic-btn--large">
                  Send Inquiry
                </MagneticButton>
              </form>
            )}
          </div>
        </div>
      </section>

      <TornEdge position="bottom" color="var(--color-charcoal)" />
    </div>
  );
}
