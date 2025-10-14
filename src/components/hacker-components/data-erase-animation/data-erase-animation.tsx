import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { gsap } from 'gsap';

interface DataEraseAnimationProps {
  setDataErased: Dispatch<SetStateAction<boolean>>;
  dataErased: boolean;
}

const DataEraseProgress = ({
  setDataErased,
  dataErased,
}: DataEraseAnimationProps) => {
  const barFillRef = useRef<SVGRectElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const frameRef = useRef<SVGRectElement>(null);
  const [isErasing, setIsErasing] = useState<boolean>(false);

  useEffect(() => {
    if (dataErased === true) {
      const ctx = new (window.AudioContext || window.AudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(990, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);

      osc.onended = () => ctx.close();
    }
  }, [dataErased]);

  const handleErase = () => {
    const tl = gsap.timeline();
    setIsErasing(true);

    // Reset do výchozího stavu
    gsap.set(barFillRef.current, { width: 0, opacity: 1 });
    gsap.set(textRef.current, { opacity: 0 });
    gsap.set(frameRef.current, { stroke: '#66FFB2' });

    // „Zahřívací“ bliknutí rámu
    tl.to(frameRef.current, {
      stroke: '#00CC66',
      duration: 0.2,
      repeat: 2,
      yoyo: true,
    });

    // Naplnění progress baru
    tl.to(barFillRef.current, {
      width: 300,
      duration: 20,
      ease: 'power2.inOut',
    });

    // Malé zavlnění po dokončení
    tl.to(barFillRef.current, {
      scaleX: 1.05,
      transformOrigin: 'left center',
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    });

    // Zmizí progress a ukáže se text
    tl.to(barFillRef.current, { opacity: 1, duration: 0.4 }, '+=0.2');
    tl.to(textRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' });

    // Blikání nápisu DATA ERASED
    tl.to(textRef.current, {
      opacity: 0.3,
      duration: 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    setTimeout(() => (setIsErasing(false), setDataErased(true)), 22000);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <p>Pro trvalé smazání obsahu uzlu stiskněte tlačítko níže.</p>
      <p style={{ color: '#FF4D4D' }}>
        Varování: odstranění dat je trvalé a nezvratné!
      </p>
      <svg
        width='400'
        height='200'
        viewBox='0 0 400 200'
        style={{ overflow: 'visible' }}
      >
        {/* Rám progress baru */}
        <rect
          ref={frameRef}
          x='50'
          y='90'
          width='300'
          height='20'
          rx='4'
          ry='4'
          fill='none'
          stroke='#66FFB2'
          strokeWidth='3'
        />
        {/* Naplňující se pruh */}
        <rect
          ref={barFillRef}
          x='50'
          y='90'
          height='20'
          rx='4'
          ry='4'
          fill='#00CC66'
          width='0'
        />
        {/* Text „DATA ERASED“ */}
        <text
          ref={textRef}
          x='200'
          y='160'
          textAnchor='middle'
          fontSize='24'
          fill='#66FFB2'
          fontFamily='monospace'
          opacity='0'
        >
          DATA ERASED
        </text>
      </svg>

      {!dataErased && (
        <button
          onClick={handleErase}
          disabled={isErasing || dataErased}
          className='power-btn'
        >
          {isErasing ? 'Odstraňuji data...' : 'Odstranit data'}
        </button>
      )}
    </div>
  );
};

export default DataEraseProgress;
