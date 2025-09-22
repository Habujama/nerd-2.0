import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './loading-eden.css';

type LoadingEdenProps = {
  setLoadingComplete: (complete: boolean) => void;
  duration?: number;
};

const LoadingEden = ({ setLoadingComplete, duration = 50 }: LoadingEdenProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const fuse = svg.querySelector('.fuse') as SVGPathElement | null;
    const target = svg.querySelector('.target') as SVGPathElement | null;
    if (!fuse) return;

    const val = { distance: 0 };

    gsap.to(val, {
      distance: fuse.getTotalLength(),
      repeat: 0,
      repeatDelay: 1,
      duration,
      onUpdate: () => {
        const point = fuse.getPointAtLength(val.distance);
        createParticle(point);
      },
    });

    function createParticle(point: DOMPoint) {
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle',
      );
      // Prepend the element to the SVG
      svg?.prepend(circle);
      // Set the coordinates of that circle
      circle.setAttribute('cx', point.x.toString());
      circle.setAttribute('cy', point.y.toString());
      // Define a random radius for each circle
      circle.setAttribute('r', (Math.random() * 10 + 0.5).toString());
      circle.setAttribute(
        'fill',
        gsap.utils.random(['#fff', '#66FFB2', '#00CC66']),
      );
      gsap.to(circle, {
        cx: '+=random(-20,20)',
        cy: '+=random(-20,20)',
        opacity: 0,
        duration: 'random(1, 2)',
        autoRound: false,
        onComplete: () => {
          // Remove the SVG element from its parent
          svg?.removeChild(circle);
        },
      });
    }

    fuse.setAttribute('stroke-dasharray', fuse.getTotalLength().toString());
    fuse.setAttribute(
      'stroke-dashoffset',
      (fuse.getTotalLength() * 2).toString(),
    );
    const run = gsap.to(fuse, {
      strokeDashoffset: fuse.getTotalLength(),
      duration,
      repeat: 0,
      onComplete: setLoadingComplete,
    });

    const pulse = gsap.to(target, {
      r: Math.floor(Math.random() * (40 - 20 + 1) + 20),
      duration: 2,
      repeat: -1,
    });

    return () => {
      run.kill();
      pulse.kill();
    };
  }, []);

  return (
    <svg  viewBox="0 0 3040 50" ref={svgRef} xmlns="http://www.w3.org/2000/svg" className='loading-eden'>
      <path d="M 0 0 Q 0 0 3000 0" className="fuse" />
       <circle r="35" cx="3000" cy="0" fill="#66FFB2" className='target' />
    </svg>
  );
};

export default LoadingEden;
