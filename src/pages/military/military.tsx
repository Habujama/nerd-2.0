import { useState, useEffect, useRef } from 'react';
import Nav from '../../components/nav/nav.tsx';
import Wrapper from '../../components/wrapper/wrapper.tsx';
import './military.css';
import LoadingInProgress from './loading-in-progress.tsx';
import LoadingCompleted from './loading-completed.tsx';
import LoadingReady from './loading-ready.tsx';
import LoadingIntercepted from './loading-intercepted.tsx';

const MilitaryPage = () => {
  const [loadingStatus, setLoadingStatus] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingIntercepted, setLoadingIntercepted] = useState(false);
  const prevStatusRef = useRef(loadingStatus);

  const resetLoading = () => {
    setLoadingStatus([false, false, false, false, false]);
    setIsLoading(false);
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
      setLoadingIntercepted(false);
      setIsLoading(false);
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
    <Wrapper>
      <Nav />
      <div className='military-page'>
        {loadingStatus.filter(Boolean).length < 5 &&
          !isLoading &&
          !loadingIntercepted && (
            <LoadingReady
              setIsLoading={setIsLoading}
              setLoadingStatus={setLoadingStatus}
              setLoadingIntercepted={setLoadingIntercepted}
            />
          )}
        {loadingStatus.filter(Boolean).length < 5 &&
          isLoading &&
          !loadingIntercepted && (
            <LoadingInProgress
              setIsLoading={setIsLoading}
              setLoadingStatus={setLoadingStatus}
              setLoadingIntercepted={setLoadingIntercepted}
              loadingStatus={loadingStatus}
            />
          )}
        {loadingStatus.filter(Boolean).length < 5 &&
          !isLoading &&
          loadingIntercepted && (
            <LoadingIntercepted
              setIsLoading={setIsLoading}
              setLoadingStatus={setLoadingStatus}
              setLoadingIntercepted={setLoadingIntercepted}
            />
          )}
        {loadingStatus.filter(Boolean).length > 4 &&
          !isLoading &&
          !loadingIntercepted && (
            <LoadingCompleted
              setIsLoading={setIsLoading}
              resetLoading={resetLoading}
            />
          )}
      </div>
    </Wrapper>
  );
};

export default MilitaryPage;
