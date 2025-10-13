import LockedFile from './locked-file/locked-file';
import Belib from '../../../assets/audio/Belib.mp3';
import AudioPlayer from '../../../components/audio-player/audio-player';

interface Kv05Props {
  sessionId: string;
}

const Tau06 = ({ sessionId }: Kv05Props) => (
  <div className='loading-page'>
    <LockedFile sessionId={sessionId} password='Taskent'>
      <AudioPlayer audioFile={Belib} />
    </LockedFile>
  </div>
);

export default Tau06;
