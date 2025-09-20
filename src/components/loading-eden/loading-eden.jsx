import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './loading-eden.css';

const LoadingEden = ({ setLoadingComplete}) => {
  const svgRef = useRef(null);
  const duration = 3;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const fuse = svg.querySelector('.fuse');
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
      }
    });

function createParticle(point) {
  const crossGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  svg.prepend(crossGroup);

  const size = Math.random() * 15 + 5;
  const color = gsap.utils.random(['#fff', '#66FFB2', '#00CC66']);

  // Vertical bar
  const vertical = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  vertical.setAttribute('x', point.x - size / 6);
  vertical.setAttribute('y', point.y - size * 2);
  vertical.setAttribute('width', size / 3);
  vertical.setAttribute('height', size);
  vertical.setAttribute('fill', color);

  // Horizontal bar
  const horizontal = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  horizontal.setAttribute('x', point.x - size / 2);
  horizontal.setAttribute('y', point.y - size / 6);
  horizontal.setAttribute('width', size);
  horizontal.setAttribute('height', size / 3);
  horizontal.setAttribute('fill', color);

  crossGroup.appendChild(vertical);
  crossGroup.appendChild(horizontal);

  gsap.to(crossGroup, {
    x: gsap.utils.random(-50, 50),
    y: gsap.utils.random(-50, 50),
    opacity: 0,
    duration: gsap.utils.random(1, 2),
    autoRound: false,
    onComplete: () => {
      svg.removeChild(crossGroup);
    }
  });
}

    fuse.setAttribute('stroke-dasharray', fuse.getTotalLength());
    fuse.setAttribute('stroke-dashoffset', fuse.getTotalLength() * 2);
    gsap.to(fuse, {
      strokeDashoffset: fuse.getTotalLength(),
      duration,
      repeat: 0,
      onComplete: () => setLoadingComplete(true)
    });
   
  }, []);

  return (
    <svg  viewBox="0 0 3000 100" ref={svgRef} xmlns="http://www.w3.org/2000/svg" className='loading-eden'>
      <path d="M 0 0 Q 0 0 3000 0" className="fuse" />
    </svg>
  );
};

export default LoadingEden;
