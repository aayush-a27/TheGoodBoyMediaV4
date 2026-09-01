export const preloadImage = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    if (img.decode) {
      img.decode()
        .then(() => resolve())
        .catch((err) => {
          console.warn(`Failed to decode image ${src}`, err);
          resolve(); // Resolve anyway to not block the loading screen
        });
    } else {
      img.onload = () => resolve();
      img.onerror = (err) => {
        console.warn(`Failed to load image ${src}`, err);
        resolve(); // Resolve anyway
      };
    }
  });
};

export const preloadVideo = (src) => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.src = src;
    video.preload = 'auto';

    video.oncanplay = () => resolve();
    // Some browsers might fire canplaythrough, but canplay is usually enough to start
    video.onerror = (err) => {
      console.warn(`Failed to load video ${src}`, err);
      resolve(); // Resolve anyway
    };
    
    video.load();
  });
};
