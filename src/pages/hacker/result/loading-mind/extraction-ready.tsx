import './extraction.css'

interface ExtractionReadyProps {
   setIsExtracting: (isLoading: boolean) => void
    setExtractionStatus:  (isLoading: boolean[] | ((prev: boolean[]) => boolean[])) => void
    setExtractionIntercepted: (isLoading: boolean) => void
}

const ExtractionReady = ({setIsExtracting, setExtractionStatus, setExtractionIntercepted}:ExtractionReadyProps) => (
    <>
        <button
              onClick={() => {
                setExtractionStatus([false, false, false, false, false]);
                setIsExtracting(true);
                setExtractionIntercepted(false);
              }}
              className='loading-ready'
            >
              Zahájit extrahování duše
            </button>
      </>
);

export default ExtractionReady;
