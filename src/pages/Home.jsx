import './Home.css';
import Hero from '../components/sections/Hero';
import Manifesto from '../components/sections/Manifesto';
import Services from '../components/sections/Services';
import SelectedWorks from '../components/sections/SelectedWorks';
import Experiments from '../components/sections/Experiments';
import ContactCTA from '../components/sections/ContactCTA';
import HorizontalMarquee from '../components/animation/HorizontalMarquee';

export default function Home() {
  return (
    <div className="page-wrapper">
      <Hero />

      <div className="home-content-wrap">
        <div className="home-marquee-wrap">
          <HorizontalMarquee speed={0}>
            THE GOOD BOY MEDIA — CREATIVE STRATEGY — DESIGN — DIGITAL — EXPERIMENTS
          </HorizontalMarquee>
        </div>

        <Manifesto />
        <Services />
        <SelectedWorks />
        <Experiments />
        <ContactCTA />
      </div>
    </div>
  );
}
