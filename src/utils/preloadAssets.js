export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    if (img.decode) {
      img.decode()
        .then(() => resolve())
        .catch((err) => {
          console.warn(`Failed to decode image ${src}`, err);
          reject(err);
        });
    } else {
      img.onload = () => resolve();
      img.onerror = (err) => {
        console.warn(`Failed to load image ${src}`, err);
        reject(err);
      };
    }
  });
};

export const preloadVideo = (src) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = src;
    video.preload = 'auto';

    video.oncanplay = () => resolve();
    // Some browsers might fire canplaythrough, but canplay is usually enough to start
    video.onerror = (err) => {
      console.warn(`Failed to load video ${src}`, err);
      reject(err);
    };
    
    video.load();
  });
};
