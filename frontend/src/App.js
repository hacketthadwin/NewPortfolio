import { useRef, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Toaster } from 'react-hot-toast';

import HeaderSection from './components/HeaderSection';
import Home from './components/Home.jsx';
import Projects from './components/Projects';
import Competitive from './components/Competitive';
import Contact from './components/Contact';
import Preloader from './components/othercomps/PreLoader.jsx';
import MotionWrapper from './components/MotionWrapper.jsx';
import CustomCursor from './components/CustomCursor.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const scrollContainerRef = useRef(null);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={scrollContainerRef} className="lenis lenis-smooth relative">
      <CustomCursor />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
            fontSize: '20px',
            borderRadius: '10px',
            border: '1px solid #444',
          },
        }}
      />
      {isLoading ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : (
        <MotionWrapper initialLoad={false}>
          <div className="relative z-50 min-h-screen bg-black">
            <HeaderSection />
            <main className="max-w-7xl mx-auto px-4 py-12">
              <AnimatePresence mode="wait" initial={false}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/competitive" element={<Competitive />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </MotionWrapper>
      )}
    </div>
  );
}

export default App;
