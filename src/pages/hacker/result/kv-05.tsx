import { useState, useEffect, useRef } from 'react';
import Belak2 from '../../../assets/audio/Belak2.mp3';
import ExtractionInProgress from './loading-mind/extraction-in-progress.tsx';
import ExtractionCompleted from './loading-mind/extraction-completed.tsx';
import ExtractionReady from './loading-mind/extraction-ready.tsx';
import ExtractionIntercepted from './loading-mind/extraction-intercepted.tsx';
import './loading-mind/extraction.css';
import LockedFile from './locked-file/locked-file.tsx';
import AudioPlayer from '../../../components/audio-player/audio-player.tsx';

interface Kv05Props {
  sessionId: string;
}

const Kv05 = ({ sessionId }: Kv05Props) => {
  const [loadingStatus, setExtractionStatus] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isExtraction, setIsExtracting] = useState(false);
  const [loadingIntercepted, setExtractionIntercepted] = useState(false);
  const [showDetails, setShowDetails] = useState<'free' | 'locked' | null>(
    null,
  );
  const prevStatusRef = useRef(loadingStatus);

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
      <div className='nyx-buttons'>
        <button
          onClick={() => setShowDetails('free')}
          style={
            showDetails === 'free'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
          className='choice-button'
        >
          62AUN46492811
        </button>
        <button
          onClick={() => setShowDetails('locked')}
          style={
            showDetails === 'locked'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
          className='choice-button'
        >
          64AUN46489311
        </button>
      </div>
      {showDetails === 'free' && (
        <div>
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
            !loadingIntercepted && <ExtractionCompleted />}
        </div>
      )}
      {showDetails === 'locked' && (
        <LockedFile
          sessionId={sessionId}
          password='NovyDen'
          isPwdRecovarable={false}
        >
          <AudioPlayer audioFile={Belak2} />
        </LockedFile>
      )}
    </div>
  );
};

export default Kv05;
