import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../../components/nav/nav'
import Wrapper from '../../../components/wrapper/wrapper'
import ExtractionInProgress from '../result/loading-mind/extraction-in-progress.tsx'
import ExtractionReady from '../result/loading-mind/extraction-ready.tsx';
import ExtractionIntercepted from '../result/loading-mind/extraction-intercepted.tsx';
import ConnectionLoader from '../../../components/hacker-components/connecting/connecting';

const Necrohacking = () => {
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
    const navigate = useNavigate();
    
    const handleNavigateBack = () => {
        navigate('/hacker', { replace: true });
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
        <Wrapper>
            <Nav />
            <div className='hacker-page'>
                <h2 style={{marginTop: '3rem'}}>Necrohacking interface</h2>
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
            !loadingIntercepted && <ConnectionLoader />}
                </div>
                <button onClick={handleNavigateBack} className='back-button'>
        ⬅
      </button>
            </div>
    </Wrapper>
)
}

export default Necrohacking
