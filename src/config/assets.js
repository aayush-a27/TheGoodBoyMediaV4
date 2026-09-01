import heroVideoSrc from '../assets/videos/18069232-uhd_3840_2160_24fps.mp4';

// Manifesto Images
import imgHeroSrc from '../assets/images/pexels-alexeydemidov-32396961.jpg';
import imgEditorial1Src from '../assets/images/pexels-darlene-alderson-4389372.jpg';
import imgEditorial2Src from '../assets/images/pexels-egorkomarov-27141309.jpg';
import imgEditorial3Src from '../assets/images/pexels-fukajaz-31718971.jpg';
import imgEditorial4Src from '../assets/images/pexels-giuseppe-didio-64079575-8168564.jpg';
import imgEditorial5Src from '../assets/images/pexels-ivan-s-6968875.jpg';

export const ASSETS = {
  heroVideo: heroVideoSrc,
  manifesto: {
    hero: imgHeroSrc,
    editorial1: imgEditorial1Src,
    editorial2: imgEditorial2Src,
    editorial3: imgEditorial3Src,
    editorial4: imgEditorial4Src,
    editorial5: imgEditorial5Src,
  }
};

// Flatten images for the preloader
export const PRELOAD_IMAGES = [
  ASSETS.manifesto.hero,
  ASSETS.manifesto.editorial1,
  ASSETS.manifesto.editorial2,
  ASSETS.manifesto.editorial3,
  ASSETS.manifesto.editorial4,
  ASSETS.manifesto.editorial5,
];

// Videos to preload (waiting for canplay)
export const PRELOAD_VIDEOS = [
  ASSETS.heroVideo
];
