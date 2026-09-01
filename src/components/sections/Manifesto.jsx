import TornEdge from '../ui/TornEdge';
import LiquidImage from '../effects/LiquidImage';
import './Manifesto.css';

// Import all images to be used in the bento grid
import imgHero from '../../assets/images/pexels-alexeydemidov-32396961.jpg';
import imgEditorial1 from '../../assets/images/pexels-darlene-alderson-4389372.jpg';
import imgEditorial2 from '../../assets/images/pexels-egorkomarov-27141309.jpg';
import imgEditorial3 from '../../assets/images/pexels-fukajaz-31718971.jpg';
import imgEditorial4 from '../../assets/images/pexels-giuseppe-didio-64079575-8168564.jpg';
import imgEditorial5 from '../../assets/images/pexels-ivan-s-6968875.jpg';

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
            <LiquidImage src={imgHero} intensity={0.15} className="bento-img" />
            <div className="bento-annotation font-mono">Good People</div>
          </div>

          {/* Medium Landscape Image */}
          <div className="bento-item bento-medium-1">
            <LiquidImage src={imgEditorial1} intensity={0.12} className="bento-img" />
            <div className="bento-annotation font-mono">01 — Vision</div>
          </div>

          {/* Small Portrait Image */}
          <div className="bento-item bento-small-1">
            <LiquidImage src={imgEditorial2} intensity={0.18} className="bento-img" />
            <div className="bento-annotation bento-annotation--vertical font-mono">Analog</div>
          </div>

          {/* Medium Portrait Image */}
          <div className="bento-item bento-medium-2">
            <LiquidImage src={imgEditorial5} intensity={0.15} className="bento-img" />
            <div className="bento-annotation font-mono">Good Ideas</div>
          </div>

          {/* Small Landscape Image */}
          <div className="bento-item bento-small-2">
            <LiquidImage src={imgEditorial3} intensity={0.12} className="bento-img" />
          </div>

          {/* Medium Square Image */}
          <div className="bento-item bento-medium-3">
            <LiquidImage src={imgEditorial4} intensity={0.15} className="bento-img" />
            <div className="bento-annotation font-mono">Good Work</div>
          </div>

        </div>
        
      </div>

      <TornEdge position="bottom" color="var(--color-off-white)" />
    </section>
  );
}
