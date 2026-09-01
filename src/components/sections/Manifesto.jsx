import TextReveal from '../animation/TextReveal';
import PencilDraw from '../animation/PencilDraw';
import TornEdge from '../ui/TornEdge';
import './Manifesto.css';

export default function Manifesto() {
  return (
    <section className="manifesto" id="manifesto">
      <TornEdge position="top" color="var(--color-charcoal)" />

      <div className="manifesto__inner container">
        <div className="manifesto__label font-mono">
          <span className="manifesto__num">01</span>
          Who We Are
        </div>

        <div className="manifesto__text-wrap">
          <TextReveal className="manifesto__text">
            We are not another marketing agency. We are a creative studio that believes brands should feel like something — not just look like something. We combine strategy with obsessive creativity, technology with human intuition, and experimentation with purpose. Every project is an opportunity to make something people can't stop thinking about.
          </TextReveal>
        </div>

        <div className="manifesto__decoration">
          <PencilDraw />
        </div>

        <div className="manifesto__stats">
          <div className="manifesto__stat">
            <span className="manifesto__stat-num font-display">40+</span>
            <span className="manifesto__stat-label font-mono">Projects Delivered</span>
          </div>
          <div className="manifesto__stat">
            <span className="manifesto__stat-num font-display">12</span>
            <span className="manifesto__stat-label font-mono">Creative Awards</span>
          </div>
          <div className="manifesto__stat">
            <span className="manifesto__stat-num font-display">∞</span>
            <span className="manifesto__stat-label font-mono">Curiosity</span>
          </div>
        </div>
      </div>

      <TornEdge position="bottom" color="var(--color-off-white)" />
    </section>
  );
}
