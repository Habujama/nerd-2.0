import { useCallback, useEffect, useRef, useState } from "react";

export default function EkgRealisticMulti({
  duration = 4000, // delší trvání pro víc cyklů
  width = 600,
  height = 120,
  cycles = 4,
}) {
  const pathRef = useRef();
  const [pathData, setPathData] = useState("");

  const playBeep = () => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(880, ctx.currentTime); // vysoký beep
  gain.gain.setValueAtTime(0.2, ctx.currentTime);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.1); // 100 ms beep
  }
  
  function scheduleBeeps(duration, cycles) {
  const cycleDuration = duration / cycles;
  for (let i = 0; i < cycles; i++) {
    // R-vlna je na cca 30 % délky cyklu
    const rTime = i * cycleDuration + cycleDuration * 0.3;
    setTimeout(() => {
      playBeep();
    }, rTime);
  }
}

  const generateSingleCycle = useCallback((offsetX, totalWidth) => {
    const mid = height / 2;
    const w = totalWidth;

    // Náhodné amplitudy
    const pAmp = mid - 10 - Math.random() * 5;
    const qAmp = mid + 20 + Math.random() * 5;
    const rAmp = mid - 40 - Math.random() * 10;
    const sAmp = mid + 30 + Math.random() * 5;
    const tAmp = mid - 15 - Math.random() * 5;

    return [
      [offsetX + w * 0.0, mid],
      [offsetX + w * 0.05, pAmp], // P
      [offsetX + w * 0.1, mid],
      [offsetX + w * 0.25, qAmp], // Q
      [offsetX + w * 0.3, rAmp],  // R
      [offsetX + w * 0.35, sAmp], // S
      [offsetX + w * 0.45, mid],
      [offsetX + w * 0.6, tAmp],  // T
      [offsetX + w * 0.75, mid],
      [offsetX + w * 1.0, mid],   // návrat
    ];
  }, [height])

  const generatePath = useCallback(() => {
      const cycleWidth = width / cycles;
      let allPoints = [];

      for (let i = 0; i < cycles; i++) {
        allPoints = allPoints.concat(generateSingleCycle(i * cycleWidth, cycleWidth));
      }

      let d = `M${allPoints[0][0]} ${allPoints[0][1]}`;
      for (let i = 1; i < allPoints.length; i++) {
        d += ` L${allPoints[i][0]} ${allPoints[i][1]}`;
      }
      return d;
    }, [cycles, generateSingleCycle, width])

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let raf;
    let start;
    let length;

    const animate = (timestamp) => {
      if (!start) {
        scheduleBeeps(duration, cycles);
        start = timestamp;
        length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
      }

      const progress = (timestamp - start) / duration;

      if (progress < 1) {
        path.style.strokeDashoffset = length * (1 - progress);
        raf = requestAnimationFrame(animate);
      } else {
        setPathData(generatePath()); // nový náhodný úsek
        start = null;
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pathData, duration, generatePath, scheduleBeeps, cycles]);

  useEffect(() => {
    setPathData(generatePath());
  }, [generatePath]);

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
