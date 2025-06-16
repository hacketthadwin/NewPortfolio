import { useEffect, useState } from 'react';
import Particles from './Particles';

const ResponsiveParticles = () => {
  const [particleCount, setParticleCount] = useState(50);

  useEffect(() => {
    const updateParticleCount = () => {
      const width = window.innerWidth;
      
      if (width >= 1536) { // 2xl
        setParticleCount(150);
      } else if (width >= 1280) { // xl
        setParticleCount(125);
      } else if (width >= 1024) { // lg
        setParticleCount(100);
      } else if (width >= 768) { // md
        setParticleCount(75);
      } else { // sm and below
        setParticleCount(50);
      }
    };

    updateParticleCount();
    window.addEventListener('resize', updateParticleCount);
    
    return () => window.removeEventListener('resize', updateParticleCount);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen -z-50">
      <Particles
        particleColors={["#ffffff", "#eeeeee"]}
        particleCount={particleCount}
        particleSpread={2}
        speed={0.1}
        particleBaseSize={40}
        moveParticlesOnHover={false}
        alphaParticles={true}
        disableRotation={false}
      />
    </div>
  );
};

export default ResponsiveParticles;
