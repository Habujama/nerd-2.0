import Belak1 from '../../../../assets/audio/Belak1.mp3';
import './extraction.css';
import AudioPlayer from '../../../../components/audio-player/audio-player';

const ExtractionCompleted = () => (
  <>
    <h2>Extrakce dokončena!</h2>
    <AudioPlayer audioFile={Belak1} />
  </>
);

export default ExtractionCompleted;
