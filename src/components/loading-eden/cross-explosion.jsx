import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CircleExplosion = ({ trigger }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const crosses = [];
    const numCrosses = 666;

    for (let i = 0; i < numCrosses; i++) {
      const cross = document.createElement('div');
      cross.style.position = 'absolute';
      cross.style.left = `${Math.random() * 100}%`;
      cross.style.top = `${Math.random() * 100}%`;
      cross.style.width = '40px';
      cross.style.height = '40px';
      cross.style.pointerEvents = 'none';

      // Vertical bar
      const vertical = document.createElement('div');
      vertical.style.position = 'absolute';
      vertical.style.left = '18px';
      vertical.style.top = '0px';
      vertical.style.width = '4px';
      vertical.style.height = '80px';
      vertical.style.background = gsap.utils.random(['#fff', '#66FFB2', '#00CC66']);
      vertical.style.borderRadius = '2px';

      // Horizontal bar
      const horizontal = document.createElement('div');
      horizontal.style.position = 'absolute';
      horizontal.style.left = '0px';
      horizontal.style.top = '18px';
      horizontal.style.width = '40px';
      horizontal.style.height = '4px';
      horizontal.style.background = vertical.style.background;
      horizontal.style.borderRadius = '2px';

      cross.appendChild(vertical);
      cross.appendChild(horizontal);
      container.appendChild(cross);
      crosses.push(cross);
    }

    gsap.to(crosses, {
      opacity: 1,
      scale: 1.5,
      duration: 2,
      stagger: 0.01,
      onComplete: () => {
        gsap.to(crosses, {
          opacity: 0,
          scale: 0.5,
          duration: 0.7,
          delay: 0.5,
          onComplete: () => {
            container.innerHTML = '';
          }
        });
      }
    });
  }, [trigger]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default CircleExplosion;
