import './extraction.css';

interface ExtractionCompletedProps {
  resetExtraction: () => void;
}

const ExtractionCompleted = ({ resetExtraction }: ExtractionCompletedProps) => (
  <>
    <h2>Extrakce dokončena!</h2>
    <button
      onClick={() => {
        resetExtraction();
      }}
      style={{ width: '400px' }}
    >
      Přehrát záznam
    </button>
  </>
);

export default ExtractionCompleted;
