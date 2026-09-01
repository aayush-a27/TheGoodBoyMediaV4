import { useState, useRef, useEffect } from 'react';
import TornEdge from '../ui/TornEdge';
import HorizontalMarquee from '../animation/HorizontalMarquee';
import './Services.css';

const services = [
  {
    num: '01',
    title: 'Marketing & Creative Strategy',
    description: 'We don\'t do safe. We build strategies that make people stop, look, and feel something. Research-backed, gut-checked, creatively dangerous.',
  },
  {
    num: '02',
    title: 'Social Media & Content',
    description: 'Content that people actually want to see. We create social presences that build culture, not just followers.',
  },
  {
    num: '03',
    title: 'Creative Direction & Design',
    description: 'From brand identities to campaign art direction. We craft visual worlds that people can\'t forget.',
  },
  {
    num: '04',
    title: 'Web Development',
    description: 'Websites that feel alive. Interactive, performant, and designed to make an impression that lasts.',
  },
  {
    num: '05',
    title: '3D / Visual Experiences',
    description: 'Spatial design, WebGL experiments, immersive digital environments. We build experiences that blur the screen.',
  },
  {
    num: '06',
    title: 'SEO',
    description: 'Beautiful work deserves to be found. We optimize for humans first, algorithms second.',
  },
  {
    num: '07',
    title: 'Advertising',
    description: 'Campaigns that cut through noise. Paid media strategy and creative that earns attention, not just impressions.',
  },
  {
    num: '08',
    title: 'Experiments & Innovation',
    description: 'Our playground. Where we test ideas, break rules, and build things nobody asked for — but everybody needs.',
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="services" id="services">
      <TornEdge position="top" color="var(--color-cream)" />

      <div className="services__marquee">
        <HorizontalMarquee speed={25} className="marquee--outline">
          WHAT WE DO
        </HorizontalMarquee>
      </div>

      <div className="services__inner container">
        <div className="services__header">
          <span className="services__label font-mono">02 — Capabilities</span>
          <h2 className="services__title">
            We do a lot.<br />
            <em className="font-heading">All of it obsessively.</em>
          </h2>
        </div>

        <div className="services__list">
          {services.map((service, i) => (
            <div
              key={i}
              className={`services__item ${activeIndex === i ? 'services__item--active' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              data-cursor="VIEW"
            >
              <div className="services__item-left">
                <span className="services__item-num font-mono">{service.num}</span>
                <h3 className="services__item-title">{service.title}</h3>
              </div>
              <div className="services__item-right">
                <p className="services__item-desc">{service.description}</p>
                <span className="services__item-arrow" aria-hidden="true">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TornEdge position="bottom" color="var(--color-parchment)" />
    </section>
  );
}
