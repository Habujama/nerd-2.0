import LockedFile from './locked-file/locked-file';
import Belib from '../../../assets/audio/Belib.mp3';
import AudioPlayer from '../../../components/audio-player/audio-player';

const Tau06 = () => (
  <div className='loading-page'>
    <LockedFile password='Taskent'>
      <AudioPlayer audioFile={Belib} />
    </LockedFile>
  </div>
);

export default Tau06;
