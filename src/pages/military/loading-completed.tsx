import './military.css';

interface LoadingCompletedProps {
    setIsLoading: (isLoading: boolean) => void;
    resetLoading: () => void;
}

const LoadingCompleted = ({setIsLoading, resetLoading}:LoadingCompletedProps) => (
    <>
        <h2>Nahrávání dokončeno!</h2>
        <p>Přenos duševních struktur dokončen. Jednotka je nyní trvale vázána k orbitálnímu jádru EDEN. Operace byla vykonána v souladu s Nařízením Rady EUFORCOM č. 23/91. Subjekt je považován za <i>digitálně přítomného</i> a podléhá dalšímu nasazení dle rozkazů velení a nařízení č. 354/99.
              </p>
             <button
              onClick={() => {
                resetLoading();
                setIsLoading(false);
              }}
              style={{ width: '400px' }}
            >
              Nahrát další
            </button>
      </>
);

export default LoadingCompleted;
