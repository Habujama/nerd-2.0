import { useEffect, useRef } from "react";

export default function EkgExitus({
  duration = 4000,
  width = 600,
  height = 120,
}) {
    const pathRef = useRef();
    
  // rovná čára
  const mid = height / 2;
  const pathData = `M0 ${mid} L${width} ${mid}`;

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let raf;
    let start;
    let length;

    const animate = (timestamp) => {
      if (!start) {
        start = timestamp;
        length = path.getTotalLength();
        path.style.strokeDasharray = `${length + 10} 3`; 
        path.style.strokeDashoffset = 0;
      }

      const progress = (timestamp - start) / duration;

      if (progress < 1) {
        path.style.strokeDashoffset = length * (1 - progress);
        raf = requestAnimationFrame(animate);
      } else {
        start = null;
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  // stálý tón
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();

    return () => {
      osc.stop();
      ctx.close();
    };
  }, []);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
      <path
        ref={pathRef}
        d={pathData}
        stroke="#66FFB2"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
