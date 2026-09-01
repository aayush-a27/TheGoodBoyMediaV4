import { useState } from 'react';
import { blogs, blogCategories } from '../data/blogs';
import TornEdge from '../components/ui/TornEdge';
import './Blogs.css';

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

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredBlogs = activeCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === activeCategory);

  return (
    <div className="page-wrapper">
      {/* Header */}
      <section className="blogs-hero">
        <div className="blogs-hero__inner container">
          <span className="blogs-hero__label font-mono">Journal</span>
          <h1 className="blogs-hero__title">
            Thoughts, <em className="font-heading">provocations</em><br />
            & observations
          </h1>
          <p className="blogs-hero__desc">
            Where we share thinking on brand, design, technology and culture.
            Less content marketing, more genuine obsession.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="blogs-content container">
        <div className="blogs-filter">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              className={`blogs-filter__btn font-mono ${activeCategory === cat ? 'blogs-filter__btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured */}
        {activeCategory === 'All' && filteredBlogs.length > 0 && (
          <article className="blog-featured" data-cursor="READ">
            <div className="blog-featured__image-wrap">
              <img
                src={imageMap[filteredBlogs[0].image]}
                alt={filteredBlogs[0].title}
                className="blog-featured__image"
                loading="lazy"
              />
            </div>
            <div className="blog-featured__info">
              <div className="blog-featured__meta">
                <span className="blog-featured__category font-mono">{filteredBlogs[0].category}</span>
                <span className="blog-featured__date font-mono">{filteredBlogs[0].date}</span>
                <span className="blog-featured__read font-mono">{filteredBlogs[0].readTime}</span>
              </div>
              <h2 className="blog-featured__title">{filteredBlogs[0].title}</h2>
              <p className="blog-featured__excerpt">{filteredBlogs[0].excerpt}</p>
              <span className="blog-featured__link font-display">Read Article →</span>
            </div>
          </article>
        )}

        {/* Grid */}
        <div className="blogs-grid">
          {(activeCategory === 'All' ? filteredBlogs.slice(1) : filteredBlogs).map((blog) => (
            <article key={blog.id} className="blog-card" data-cursor="READ">
              <div className="blog-card__image-wrap">
                <img
                  src={imageMap[blog.image]}
                  alt={blog.title}
                  className="blog-card__image"
                  loading="lazy"
                />
              </div>
              <div className="blog-card__info">
                <div className="blog-card__meta">
                  <span className="blog-card__category font-mono">{blog.category}</span>
                  <span className="blog-card__read font-mono">{blog.readTime}</span>
                </div>
                <h3 className="blog-card__title">{blog.title}</h3>
                <p className="blog-card__excerpt">{blog.excerpt}</p>
                <div className="blog-card__bottom">
                  <span className="blog-card__date font-mono">{blog.date}</span>
                  <span className="blog-card__arrow">→</span>
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
