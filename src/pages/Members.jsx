import { useState } from 'react';
import { members } from '../data/members';
import TornEdge from '../components/ui/TornEdge';
import HorizontalMarquee from '../components/animation/HorizontalMarquee';
import './Members.css';

import img1 from '../assets/images/pexels-alexeydemidov-32396961.jpg';
import img2 from '../assets/images/pexels-darlene-alderson-4389372.jpg';
import img3 from '../assets/images/pexels-egorkomarov-27141309.jpg';
import img4 from '../assets/images/pexels-fukajaz-31718971.jpg';
import img5 from '../assets/images/pexels-ivan-s-6968875.jpg';
import img6 from '../assets/images/pexels-giuseppe-didio-64079575-8168564.jpg';

const imageMap = {
  'pexels-alexeydemidov-32396961.jpg': img1,
  'pexels-darlene-alderson-4389372.jpg': img2,
  'pexels-egorkomarov-27141309.jpg': img3,
  'pexels-fukajaz-31718971.jpg': img4,
  'pexels-ivan-s-6968875.jpg': img5,
  'pexels-giuseppe-didio-64079575-8168564.jpg': img6,
};

export default function Members() {
  const [activeMember, setActiveMember] = useState(null);

  return (
    <div className="page-wrapper">
      <section className="members-hero">
        <div className="members-hero__inner container">
          <span className="members-hero__label font-mono">The Team</span>
          <h1 className="members-hero__title">
            The <em className="font-heading">people</em><br />
            behind the work
          </h1>
          <p className="members-hero__desc">
            A small, obsessive team of strategists, designers, developers, and
            creative technologists. We chose each other because none of us settle for expected.
          </p>
        </div>
      </section>

      <div className="members-marquee">
        <HorizontalMarquee speed={40} direction="right" className="marquee--small">
          CREATIVE DIRECTOR — DIGITAL DIRECTOR — DESIGN LEAD — 3D ARTIST — STRATEGY LEAD — DEVELOPER
        </HorizontalMarquee>
      </div>

      <section className="members-content container">
        <div className="members-grid">
          {members.map((member, i) => (
            <article
              key={member.id}
              className={`member-card ${activeMember === member.id ? 'member-card--active' : ''}`}
              onMouseEnter={() => setActiveMember(member.id)}
              onMouseLeave={() => setActiveMember(null)}
              data-cursor="VIEW"
            >
              <div className="member-card__image-wrap">
                <img
                  src={imageMap[member.image]}
                  alt={member.name}
                  className="member-card__image"
                  loading="lazy"
                />
                <div className="member-card__overlay">
                  <p className="member-card__bio">{member.bio}</p>
                </div>
              </div>

              <div className="member-card__info">
                <span className="member-card__num font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="member-card__name">{member.name}</h3>
                <span className="member-card__role font-mono">{member.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TornEdge position="bottom" color="var(--color-charcoal)" />
    </div>
  );
}
