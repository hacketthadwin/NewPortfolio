import { useRef, useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Toaster } from 'react-hot-toast';
import { gsap } from 'gsap'; // Import gsap
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

import HeaderSection from './components/HeaderSection';
import Home from './components/Home.jsx';
import Projects from './components/Projects';
import Competitive from './components/Competitive';
import Contact from './components/Contact';
import Preloader from './components/othercomps/PreLoader.jsx';
import MotionWrapper from './components/MotionWrapper.jsx';
import CustomCursor from './components/CustomCursor.jsx';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const lenisInstance = useRef(null); // Use a ref to store the Lenis instance

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    if (lenisInstance.current) {
      // A small timeout ensures the DOM has updated and overflow:auto is applied
      setTimeout(() => {
        lenisInstance.current.resize();
        lenisInstance.current.scrollTo(0, { immediate: true });
        // Refresh ScrollTrigger to pick up new dimensions and scroll state after content loads
        ScrollTrigger.refresh();
      }, 100); // Adjust this delay if content is heavy or animations are slow
    }
  }, []); // No dependencies for lenisInstance.current as it's a ref

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1.1,
    });

    lenisInstance.current = lenis; // Store the instance in the ref

    // Integrate Lenis with ScrollTrigger
    // This tells ScrollTrigger to update its internal scroll position whenever Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP's ticker is generally more efficient for animations than requestAnimationFrame directly
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Lenis expects milliseconds
    });

    // Initial refresh for ScrollTrigger to ensure it measures correctly after Lenis setup
    ScrollTrigger.refresh();

    return () => {
      // Cleanup: Destroy Lenis instance
      lenis.destroy();
      // Remove the scroll listener from Lenis
      lenis.off('scroll', ScrollTrigger.update);
      // Remove the GSAP ticker listener
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      // Kill all ScrollTriggers created on this page to prevent memory leaks.
      // This is generally safe in a top-level component like App.
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Run once on mount

  return (
    <div className="relative">
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
