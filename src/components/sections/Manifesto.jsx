import TornEdge from '../ui/TornEdge';
import LiquidImage from '../effects/LiquidImage';
import './Manifesto.css';

import { ASSETS } from '../../config/assets';

export default function Manifesto() {
  return (
    <section className="manifesto" id="manifesto">
      <TornEdge position="top" color="var(--color-charcoal)" />

      <div className="manifesto__inner container">
        
        <div className="manifesto__header">
          <div className="manifesto__label font-mono">
            <span className="manifesto__num">01 / 06</span>
            Editorial Study
          </div>
          <div className="manifesto__label manifesto__label--right font-mono">
            The Good Boy Media
          </div>
        </div>

        <div className="manifesto__bento">
          {/* Main Hero Image - Large */}
          <div className="bento-item bento-hero">
            <LiquidImage src={ASSETS.manifesto.hero} intensity={0.15} className="bento-img" />
            <div className="bento-annotation font-mono">Good People</div>
          </div>

          {/* Medium Landscape Image */}
          <div className="bento-item bento-medium-1">
            <LiquidImage src={ASSETS.manifesto.editorial1} intensity={0.12} className="bento-img" />
            <div className="bento-annotation font-mono">01 — Vision</div>
          </div>

          {/* Small Portrait Image */}
          <div className="bento-item bento-small-1">
            <LiquidImage src={ASSETS.manifesto.editorial2} intensity={0.18} className="bento-img" />
            <div className="bento-annotation bento-annotation--vertical font-mono">Analog</div>
          </div>

          {/* Medium Portrait Image */}
          <div className="bento-item bento-medium-2">
            <LiquidImage src={ASSETS.manifesto.editorial5} intensity={0.15} className="bento-img" />
            <div className="bento-annotation font-mono">Good Ideas</div>
          </div>

          {/* Small Landscape Image */}
          <div className="bento-item bento-small-2">
            <LiquidImage src={ASSETS.manifesto.editorial3} intensity={0.12} className="bento-img" />
          </div>

          {/* Medium Square Image */}
          <div className="bento-item bento-medium-3">
            <LiquidImage src={ASSETS.manifesto.editorial4} intensity={0.15} className="bento-img" />
            <div className="bento-annotation font-mono">Good Work</div>
          </div>

        </div>
        
      </div>

      <TornEdge position="bottom" color="var(--color-off-white)" />
    </section>
  );
}
