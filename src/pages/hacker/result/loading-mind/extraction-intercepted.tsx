import './extraction.css';

interface ExtractionInterceptedProps {
   setIsExtracting: (isLoading: boolean) => void
    setExtractionStatus:  (isLoading: boolean[] | ((prev: boolean[]) => boolean[])) => void
    setExtractionIntercepted: (isLoading: boolean) => void
}

const ExtractionIntercepted = ({
  setIsExtracting,
  setExtractionStatus,
  setExtractionIntercepted,
}: ExtractionInterceptedProps) => (
  <>
    <h2>Extrahování duše bylo přerušeno!</h2>
    <p>
      Před opětovným zapojením proveďte důkladnou konrolu subjektu. Mohlo dojít
      k poškození synapsí. Data z příštího nahrávání nemusí být spolehlivá.
    </p>
    <button
      onClick={() => {
        setExtractionStatus([false, false, false, false, false]);
        setIsExtracting(false);
        setExtractionIntercepted(false);
      }}
      style={{ width: '400px' }}
    >
      Zpět
    </button>
  </>
);

export default ExtractionIntercepted;
