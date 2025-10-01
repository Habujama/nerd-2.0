import LoadingEden from '../../components/loading-eden/loading-eden.js';
import './military.css';

interface LoadingInProgressProps {
    setIsLoading: (isLoading: boolean) => void
    setLoadingStatus:  (isLoading: boolean[] | ((prev: boolean[]) => boolean[])) => void
    setLoadingIntercepted: (isLoading: boolean) => void
    loadingStatus: boolean[];
}

const LoadingInProgress = ({setIsLoading, setLoadingStatus, setLoadingIntercepted, loadingStatus}:LoadingInProgressProps) => (
    <>
        <span>
        <h2 style={{marginBlockStart: 0}}>Transfer probíhá</h2>
        <p>Proces nahrávání je zahájen na základě ověření identity a souhlasu subjektu. Veškeré kroky jsou monitorovány a archivovány pro účely bezpečnostního auditu. Transfer vědomí probíhá v několika fázích. Každá fáze je nezbytná pro úspěšné dokončení procesu a zajištění integrity dat.</p>
            </span>
            <button
              onClick={() => {
                setLoadingStatus([false, false, false, false, false]);
                setIsLoading(false);
                setLoadingIntercepted(true);
              }}
              style={{ width: '400px' }}
            >
              Přerušit nahrávání do Edenu
            </button>
          <div className='loading'>
            {['Kognice', 'Emoce', 'Identita', 'Paměť', 'Podvědomí'].map(
              (label, i) => (
                <span key={label}>
                  <LoadingEden
                    setLoadingComplete={() =>
                      setLoadingStatus((prev: boolean[]) => {
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

export default LoadingInProgress;
