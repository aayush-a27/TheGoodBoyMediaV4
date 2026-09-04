import { useState } from 'react';
import { Link } from 'react-router-dom';
import TornEdge from '../ui/TornEdge';
import './SelectedWorks.css';

import img1 from '../../assets/images/pexels-alexeydemidov-32396961.jpg';
import img2 from '../../assets/images/pexels-egorkomarov-27141309.jpg';
import img3 from '../../assets/images/pexels-darlene-alderson-4389372.jpg';
import img4 from '../../assets/images/pexels-ivan-s-6968875.jpg';
import img5 from '../../assets/images/pexels-fukajaz-31718971.jpg';

const works = [
  { id: 1, title: 'GOODBOY', subtitle: 'Brand Identity', year: '2026', category: 'Branding', image: img1, color: '#C8463C' },
  { id: 2, title: 'VOID', subtitle: 'Digital Experience', year: '2026', category: 'Web', image: img2, color: '#2E4A7A' },
  { id: 3, title: 'PALM HOUSE', subtitle: 'Campaign', year: '2025', category: 'Campaign', image: img3, color: '#D4A843' },
  { id: 4, title: 'AFTER HOURS', subtitle: 'Fashion Campaign', year: '2025', category: 'Fashion', image: img4, color: '#6B1D2A' },
  { id: 5, title: 'MONO', subtitle: 'Web Experience', year: '2025', category: 'Web', image: img5, color: '#5C6B4E' },
];

export default function SelectedWorks() {
  const [hoveredId, setHoveredId] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <section className="selected-works" id="selected-works">
      <TornEdge position="top" color="var(--color-off-white)" />

      <div className="selected-works__inner container">
        <div className="selected-works__header">
          <span className="selected-works__label font-mono">03 — Selected Work</span>
          <h2 className="selected-works__title">
            Work that <em className="font-heading">speaks</em>
          </h2>
        </div>

        <div className="selected-works__list" onMouseMove={handleMouseMove}>
          {works.map((work, i) => (
            <div
              key={work.id}
              className={`selected-works__item ${hoveredId === work.id ? 'selected-works__item--active' : ''}`}
              onMouseEnter={() => setHoveredId(work.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-cursor="VIEW"
            >
              <div className="selected-works__item-left">
                <span className="selected-works__item-num font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="selected-works__item-title">{work.title}</h3>
              </div>

              <div className="selected-works__item-meta">
                <span className="selected-works__item-subtitle">{work.subtitle}</span>
                <span className="selected-works__item-year font-mono">{work.year}</span>
              </div>

              {/* Hover Image */}
              {hoveredId === work.id && (
                <div
                  className="selected-works__item-image"
                  style={{
                    left: mousePos.x,
                    top: mousePos.y,
                  }}
                >
                  <img src={work.image} alt={work.title} loading="lazy" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="selected-works__cta">
          <Link to="/works" className="selected-works__link" data-cursor="EXPLORE">
            <span className="selected-works__link-text font-display">View All Work</span>
            <span className="selected-works__link-arrow">→</span>
          </Link>
        </div>
      </div>

      <TornEdge position="bottom" color="var(--color-charcoal)" />
    </section>
  );
}
