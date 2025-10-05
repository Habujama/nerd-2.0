import './military.css';

interface LoadingInterceptedProps {
   setIsLoading: (isLoading: boolean) => void
    setLoadingStatus:  (isLoading: boolean[] | ((prev: boolean[]) => boolean[])) => void
    setLoadingIntercepted: (isLoading: boolean) => void
}

const LoadingIntercepted = ({setIsLoading, setLoadingStatus, setLoadingIntercepted}:LoadingInterceptedProps) => (
    <>
        <h2>Kognitivní transfer byl přerušen!</h2>
        <p>V souladu se Směrnicí EUFORCOM č. 23/91 byl proces nahrávání vědomí do orbitální stanice Eden přerušen z důvodu nesplnění podmínek transferu nebo v důsledku manuálního pozastavení přenosu.
Další postup je možný pouze na základě nové autorizace a splnění všech bezpečnostních protokolů.
Každé přerušení znamená dočasné omezení přístupu cílové osoby k programu Eden.</p>
        <button
              onClick={() => {
                setLoadingStatus([false, false, false, false, false]);
                setIsLoading(false);
                setLoadingIntercepted(false);
              }}
              style={{ width: '400px' }}
            >
              Zpět
            </button>
      </>
);

export default LoadingIntercepted;
