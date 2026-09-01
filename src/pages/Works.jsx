import { useState } from 'react';
import { projects, projectCategories } from '../data/projects';
import TornEdge from '../components/ui/TornEdge';
import HorizontalMarquee from '../components/animation/HorizontalMarquee';
import './Works.css';

import img1 from '../assets/images/pexels-alexeydemidov-32396961.jpg';
import img2 from '../assets/images/pexels-egorkomarov-27141309.jpg';
import img3 from '../assets/images/pexels-darlene-alderson-4389372.jpg';
import img4 from '../assets/images/pexels-ivan-s-6968875.jpg';
import img5 from '../assets/images/pexels-fukajaz-31718971.jpg';
import img6 from '../assets/images/pexels-giuseppe-didio-64079575-8168564.jpg';

const imageMap = {
  'pexels-alexeydemidov-32396961.jpg': img1,
  'pexels-egorkomarov-27141309.jpg': img2,
  'pexels-darlene-alderson-4389372.jpg': img3,
  'pexels-ivan-s-6968875.jpg': img4,
  'pexels-fukajaz-31718971.jpg': img5,
  'pexels-giuseppe-didio-64079575-8168564.jpg': img6,
};

export default function Works() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section className="works-hero">
        <div className="works-hero__inner container">
          <span className="works-hero__label font-mono">Our Work</span>
          <h1 className="works-hero__title">
            Selected <em className="font-heading">projects</em>
          </h1>
          <p className="works-hero__desc">
            A curated selection of work across branding, digital, campaign, and experimental projects.
            Each one made to be impossible to ignore.
          </p>
        </div>
      </section>

      <div className="works-marquee">
        <HorizontalMarquee speed={35} className="marquee--outline">
          SELECTED WORK
        </HorizontalMarquee>
      </div>

      {/* Filter */}
      <section className="works-content container">
        <div className="works-filter">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              className={`works-filter__btn font-mono ${activeCategory === cat ? 'works-filter__btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="works-grid">
          {filteredProjects.map((project, i) => (
            <article
              key={project.id}
              className={`works-card ${hoveredProject === project.id ? 'works-card--active' : ''}`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              data-cursor="VIEW"
              style={{ '--card-accent': project.color }}
            >
              <div className="works-card__image-wrap">
                <img
                  src={imageMap[project.image]}
                  alt={project.title}
                  className="works-card__image"
                  loading="lazy"
                />
                <div className="works-card__image-overlay" />
              </div>

              <div className="works-card__info">
                <div className="works-card__top">
                  <span className="works-card__num font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="works-card__category font-mono">{project.category}</span>
                </div>

                <h2 className="works-card__title">{project.title}</h2>
                <p className="works-card__subtitle font-heading">{project.subtitle}</p>
                <p className="works-card__desc">{project.description}</p>

                <div className="works-card__meta">
                  <div className="works-card__services">
                    {project.services.map((s, j) => (
                      <span key={j} className="works-card__service font-mono">{s}</span>
                    ))}
                  </div>
                  <span className="works-card__year font-mono">{project.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TornEdge position="bottom" color="var(--color-charcoal)" />
    </div>
  );
}
