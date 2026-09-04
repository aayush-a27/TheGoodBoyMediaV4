import TornEdge from '../ui/TornEdge';
import './Manifesto.css';

function ManifestoCard({ number, title, description }) {
  return (
    <div className="manifesto-card" data-cursor="VIEW">
      {/* ── Media placeholder — replace with <img>, <video>, or <LiquidImage> ── */}
      <div className="manifesto-card__media">
        <div className="manifesto-card__placeholder">
          <span className="manifesto-card__placeholder-label font-mono">
            CARD MEDIA — {number}
          </span>
        </div>
      </div>

      {/* ── Gradient overlay for text readability ── */}
      <div className="manifesto-card__overlay" aria-hidden="true" />

      {/* ── Card content anchored bottom-left ── */}
      <div className="manifesto-card__content">
        <h3 className="manifesto-card__title">{title}</h3>
        <p className="manifesto-card__desc">{description}</p>
      </div>
    </div>
  );
}

const cards = [
  {
    number: '01',
    title: 'Advertising',
    description: 'For ad campaigns, big and small.',
  },
  {
    number: '02',
    title: 'Festivals & Events',
    description: 'Experiences that people remember.',
  },
  {
    number: '03',
    title: 'Films',
    description: 'Upgrade your brand with visual storytelling.',
  },
];

export default function Manifesto() {
  return (
    <section className="manifesto" id="manifesto">
      <TornEdge position="top" color="var(--color-charcoal)" />

      <div className="manifesto__inner container">
        {/* ── Section heading ── */}
        <div className="manifesto__intro">
          <h2 className="manifesto__heading font-heading text-italic">
            WHAT WE DO
          </h2>
          <p className="manifesto__description">
            We build brands, experiences and stories that people actually want to look at.
            <br />
            Strategy meets craft — no fluff, no filler.
          </p>
        </div>

        {/* ── 3-column editorial grid ── */}
        <div className="manifesto__grid">
          {cards.map((card) => (
            <ManifestoCard
              key={card.number}
              number={card.number}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>

      <TornEdge position="bottom" color="var(--color-off-white)" />
    </section>
  );
}
