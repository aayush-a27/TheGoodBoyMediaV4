import { lazy, Suspense } from 'react';
import TornEdge from '../ui/TornEdge';
import CircularMarquee from '../animation/CircularMarquee';
import HorizontalMarquee from '../animation/HorizontalMarquee';
import './Experiments.css';

const InteractiveModel = lazy(() => import('../3d/InteractiveModel'));

export default function Experiments() {
  return (
    <section className="experiments" id="experiments">
      <TornEdge position="top" color="var(--color-parchment)" />

      <div className="experiments__inner container">
        <div className="experiments__header">
          <span className="experiments__label font-mono">04 — Digital Playground</span>
          <h2 className="experiments__title">
            Where curiosity<br />
            <em className="font-heading">becomes code.</em>
          </h2>
          <p className="experiments__desc">
            We dedicate time to pure experimentation — no client, no brief, just curiosity.
            This is where we push boundaries, test new technologies, and build things
            nobody asked for but everybody needs.
          </p>
        </div>

        <div className="experiments__grid">
          {/* 3D Interactive */}
          <div className="experiments__card experiments__card--3d" data-cursor="EXPLORE">
            <div className="experiments__card-label font-mono">Interactive 3D</div>
            <Suspense fallback={
              <div className="experiments__3d-fallback">
                <span className="font-mono">Loading 3D...</span>
              </div>
            }>
              <InteractiveModel />
            </Suspense>
            <p className="experiments__card-caption font-mono">
              Move your mouse over the object
            </p>
          </div>

          {/* Circular Marquee */}
          <div className="experiments__card experiments__card--circular">
            <div className="experiments__card-label font-mono">Motion Typography</div>
            <div className="experiments__circular-wrap">
              <CircularMarquee
                text="GOOD IDEAS • GOOD DESIGN • GOOD DIGITAL • GOOD PEOPLE • "
                size={260}
              />
              <div className="experiments__circular-center">
                <span className="experiments__circular-icon font-display">✦</span>
              </div>
            </div>
          </div>

          {/* SVG Experiment */}
          <div className="experiments__card experiments__card--svg">
            <div className="experiments__card-label font-mono">Generative Lines</div>
            <svg className="experiments__gen-svg" viewBox="0 0 400 300" fill="none" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => (
                <path
                  key={i}
                  d={`M0 ${25 * i + 20} Q${100 + Math.sin(i) * 50} ${25 * i + Math.cos(i * 2) * 30}, ${200 + Math.cos(i) * 40} ${25 * i + 15} T400 ${25 * i + 20}`}
                  stroke="var(--color-tomato)"
                  strokeWidth="1"
                  opacity={0.15 + (i * 0.06)}
                  className="experiments__gen-line"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </svg>
          </div>

          {/* Type Experiment */}
          <div className="experiments__card experiments__card--type">
            <div className="experiments__card-label font-mono">Variable Type</div>
            <div className="experiments__type-demo">
              <span className="experiments__type-char" style={{ fontWeight: 300 }}>G</span>
              <span className="experiments__type-char" style={{ fontWeight: 400 }}>O</span>
              <span className="experiments__type-char" style={{ fontWeight: 500 }}>O</span>
              <span className="experiments__type-char" style={{ fontWeight: 600 }}>D</span>
              <span className="experiments__type-char" style={{ fontWeight: 700 }}>B</span>
              <span className="experiments__type-char" style={{ fontWeight: 800 }}>O</span>
              <span className="experiments__type-char" style={{ fontWeight: 900 }}>Y</span>
            </div>
          </div>
        </div>
      </div>

      <div className="experiments__marquee">
        <HorizontalMarquee speed={35} direction="right">
          EXPERIMENTS
        </HorizontalMarquee>
      </div>

      <TornEdge position="bottom" color="var(--color-cream)" />
    </section>
  );
}
