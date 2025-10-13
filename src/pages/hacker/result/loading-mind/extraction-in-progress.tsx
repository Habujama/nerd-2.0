import LoadingEden from '../../../../components/loading-eden/loading-eden.js';
import './extraction.css';

interface ExtractionInProgressProps {
    setIsExtracting: (isLoading: boolean) => void
    setExtractionStatus:  (isLoading: boolean[] | ((prev: boolean[]) => boolean[])) => void
    setExtractionIntercepted: (isLoading: boolean) => void
    loadingStatus: boolean[];
}

const ExtractionInProgress = ({setIsExtracting, setExtractionStatus, setExtractionIntercepted, loadingStatus}:ExtractionInProgressProps) => (
    <>
        <span>
            <h2 style={{ marginBlockStart: 0 }}>Extrahování probíhá</h2>
            <p>Neodpojujte subjekt od zařízení</p>
            </span>
            <button
              onClick={() => {
                setExtractionStatus([false, false, false, false, false]);
                setIsExtracting(false);
                setExtractionIntercepted(true);
              }}
              style={{ width: '400px' }}
            >
              Přerušit extrakci
            </button>
          <div className='loading'>
            {['Kognice', 'Emoce', 'Identita', 'Paměť', 'Podvědomí'].map(
              (label, i) => (
                <span key={label}>
                  <LoadingEden
                    setLoadingComplete={() =>
                      setExtractionStatus((prev: boolean[]) => {
                        const next = [...prev];
                        next[i] = true;
                        return next;
                      })
                    }
                    duration={Math.floor(Math.random() * (36 - 19 + 1) + 19)}
                  />
                  <small
                    style={{ color: loadingStatus[i] ? '#66FFB2' : '#fff' }}
                  >
                    {label}
                  </small>
                </span>
              ),
            )}
          </div>
      </>
);

export default ExtractionInProgress;
