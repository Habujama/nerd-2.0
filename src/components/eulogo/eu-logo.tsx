import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const EuLogo = ({ radius = 100, starOuter = 20 }) => {
  const groupRef = useRef(null);

  const width = 2 * (radius + starOuter);
  const height = (width * 2) / 3;
  const cx = width / 2;
  const cy = height / 2;

  useEffect(() => {
    gsap.to(groupRef.current, {
      rotation: 360,
      transformOrigin: `${cx}px ${cy}px`,
      repeat: -1,
      ease: 'linear',
      duration: 40,
    });
  }, [cx, cy]);

  const stars = Array.from({ length: 12 }).map((_, i) => {
    const angle = (-90 + i * 30) * (Math.PI / 180);
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return <use key={i} href='#star' x={x} y={y} />;
  });

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role='img'
      aria-label='Flag of the European Union'
      ref={groupRef}
    >
      <defs>
        <g id='star' fill='#fff'>
          <polygon
            points='
              0,-30
              6.735,-9.271
              28.532,-9.271
              10.898,3.541
              17.634,24.271
              0,11.459
              -17.634,24.271
              -10.898,3.541
              -28.532,-9.271
              -6.735,-9.271'
          />
        </g>
      </defs>
      <g>{stars}</g>
    </svg>
  );
};

export default EuLogo;
