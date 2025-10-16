import { useEffect, useRef, useState } from 'react';
import Pykac1 from '../../../assets/audio/pykac1.mp3';
import Pykac2 from '../../../assets/audio/pykac2.mp3';
import AudioPlayer from '../../../components/audio-player/audio-player';
import LockedFile from './locked-file/locked-file';
import DataEraseAnimation from '../../../components/hacker-components/data-erase-animation/data-erase-animation';
import ExtractionReady from './loading-mind/extraction-ready';
import ExtractionInProgress from './loading-mind/extraction-in-progress';
import ExtractionIntercepted from './loading-mind/extraction-intercepted';


const Sigma07 = () => {
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
  const [showDetails, setShowDetails] = useState<
    'pykac1' | 'pykac2' | 'deletion' | null
  >(null);
  const [dataErased, setDataErased] = useState<boolean>(false);

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
          onClick={() => setShowDetails('pykac1')}
          className='choice-button'
          style={
            showDetails === 'pykac1'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          11AUN88920394
        </button>
        <button
          onClick={() => setShowDetails('pykac2')}
          className='choice-button'
          style={
            showDetails === 'pykac2'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          13AUN819222294
        </button>
        <button
          onClick={() => setShowDetails('deletion')}
          className='choice-button'
          style={
            showDetails === 'deletion'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          13DEL899222294
        </button>
      </div>
      {showDetails === 'pykac1' && (
        <>
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
                showTitle={false}
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
              <AudioPlayer audioFile={Pykac1} disabled={dataErased} />
            )}
        </>
      )}
      {showDetails === 'pykac2' && (
        <LockedFile password='OhenPali' isPwdRecovarable={false}>
          <AudioPlayer audioFile={Pykac2} disabled={dataErased} />
        </LockedFile>
      )}
      {showDetails === 'deletion' && (
        <LockedFile password='PykacOverride' title='Sekce uzamčena'>
          <DataEraseAnimation
            setDataErased={setDataErased}
            dataErased={dataErased}
          />
        </LockedFile>
      )}
    </div>
  );
};

export default Sigma07;
