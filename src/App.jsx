import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import LoadingScreen from './components/layout/LoadingScreen';
import GrainOverlay from './components/ui/GrainOverlay';
import MouseFollower from './components/animation/MouseFollower';

import Home from './pages/Home';
import Works from './pages/Works';
import Blogs from './pages/Blogs';
import Members from './pages/Members';
import Contact from './pages/Contact';

import './styles/globals.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  useLenis();
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <PageTransition>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/members" element={<Members />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </PageTransition>
      <Footer />
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <BrowserRouter>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <GrainOverlay />
      <MouseFollower />
      <AppContent />
    </BrowserRouter>
  );
}
