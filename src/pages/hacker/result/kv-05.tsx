import { useState, useEffect, useRef } from 'react';
import ExtractionInProgress from './loading-mind/extraction-in-progress.tsx';
import ExtractionCompleted from './loading-mind/extraction-completed.tsx';
import ExtractionReady from './loading-mind/extraction-ready.tsx';
import ExtractionIntercepted from './loading-mind/extraction-intercepted.tsx';
import './loading-mind/extraction.css';

const Kv05 = () => {
  const [loadingStatus, setExtractionStatus] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isExtraction, setIsExtracting] = useState(false);
  const [loadingIntercepted, setExtractionIntercepted] = useState(false);
  const prevStatusRef = useRef(loadingStatus);

  const resetExtraction = () => {
    setExtractionStatus([false, false, false, false, false]);
    setIsExtracting(false);
  };

  // will play sound on loadingStatus change to true
  useEffect(() => {
    loadingStatus.forEach((val, i) => {
      if (val && !prevStatusRef.current[i]) {
        // přehraj zvuk
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
    });
    prevStatusRef.current = loadingStatus;
  }, [loadingStatus]);

  // will play sound when loading is complete
  useEffect(() => {
    if (loadingStatus.filter(Boolean).length > 4) {
      setExtractionIntercepted(false);
      setIsExtracting(false);
      const timeout = setTimeout(() => {
        const ctx = new (window.AudioContext || window.AudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        gain.gain.setValueAtTime(0.5, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 5);

        osc.onended = () => ctx.close();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [loadingStatus]);

  return (
    <div className='loading-page'>
      {loadingStatus.filter(Boolean).length < 5 &&
        !isExtraction &&
        !loadingIntercepted && (
          <ExtractionReady
            setIsExtracting={setIsExtracting}
            setExtractionStatus={setExtractionStatus}
            setExtractionIntercepted={setExtractionIntercepted}
          />
        )}
      {loadingStatus.filter(Boolean).length < 5 &&
        isExtraction &&
        !loadingIntercepted && (
          <ExtractionInProgress
            setIsExtracting={setIsExtracting}
            setExtractionStatus={setExtractionStatus}
            setExtractionIntercepted={setExtractionIntercepted}
            loadingStatus={loadingStatus}
          />
        )}
      {loadingStatus.filter(Boolean).length < 5 &&
        !isExtraction &&
        loadingIntercepted && (
          <ExtractionIntercepted
            setIsExtracting={setIsExtracting}
            setExtractionStatus={setExtractionStatus}
            setExtractionIntercepted={setExtractionIntercepted}
          />
        )}
      {loadingStatus.filter(Boolean).length > 4 &&
        !isExtraction &&
        !loadingIntercepted && (
          <ExtractionCompleted resetExtraction={resetExtraction} />
        )}
    </div>
  );
};

export default Kv05;
