import { useState, useEffect } from 'react';
import { preloadImage, preloadVideo } from '../../utils/preloadAssets';
import { PRELOAD_IMAGES, PRELOAD_VIDEOS } from '../../config/assets';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | exit

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    
    const totalAssets = PRELOAD_IMAGES.length + PRELOAD_VIDEOS.length;
    if (totalAssets === 0) {
      setProgress(100);
      setPhase('exit');
      setTimeout(() => isMounted && onComplete?.(), 800);
      return;
    }

    const updateProgress = () => {
      loadedCount++;
      const percent = Math.round((loadedCount / totalAssets) * 100);
      if (isMounted) {
        setProgress(percent);
      }
    };

    const loadAll = async () => {
      const promises = [
        ...PRELOAD_IMAGES.map(src => preloadImage(src).then(updateProgress).catch((err) => {
          console.warn('Asset failed to load:', src, err);
          updateProgress();
        })),
        ...PRELOAD_VIDEOS.map(src => preloadVideo(src).then(updateProgress).catch((err) => {
          console.warn('Asset failed to load:', src, err);
          updateProgress();
        }))
      ];

      // Timeout after 8 seconds to prevent indefinite hang if something gets stuck
      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 8000));
      
      await Promise.race([Promise.allSettled(promises), timeoutPromise]);

      if (isMounted) {
        setProgress(100); // Ensure visual completion
        setTimeout(() => {
          if (isMounted) {
            setPhase('exit');
            setTimeout(() => isMounted && onComplete?.(), 800);
          }
        }, 200); // Short delay to let user see 100%
      }
    };

    loadAll();

    return () => {
      isMounted = false;
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen ${phase === 'exit' ? 'loading-screen--exit' : ''}`}>
      <div className="loading-screen__bg" aria-hidden="true" />

      <div className="loading-screen__content">
        <div className="loading-screen__brand">
          <h1 className="loading-screen__title">
            <span className="loading-screen__title-line">THE GOOD BOY</span>
            <span className="loading-screen__title-sub">MEDIA</span>
          </h1>
        </div>

        <div className="loading-screen__progress">
          <div className="loading-screen__bar-track">
            <div
              className="loading-screen__bar-fill"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <span className="loading-screen__percent font-mono">
            {String(progress).padStart(3, '0')}
          </span>
        </div>

        {/* Decorative SVG line drawing */}
        <svg
          className="loading-screen__decoration"
          viewBox="0 0 400 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            className="loading-screen__draw-path"
            d="M0 20 C30 5, 60 35, 100 20 C140 5, 170 35, 200 20 C230 5, 260 35, 300 20 C340 5, 370 35, 400 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
