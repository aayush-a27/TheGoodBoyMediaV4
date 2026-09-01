import { memo } from 'react';
import './GrainOverlay.css';

const GrainOverlay = memo(function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
});

export default GrainOverlay;
