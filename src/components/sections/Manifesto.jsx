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

       
        
      </div>

      <TornEdge position="bottom" color="var(--color-off-white)" />
    </section>
  );
}
