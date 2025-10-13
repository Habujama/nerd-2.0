import { useState } from 'react';
import Pykac1 from '../../../assets/audio/pykac1.mp3';
import Pykac2 from '../../../assets/audio/pykac2.mp3';
import AudioPlayer from '../../../components/audio-player/audio-player';
import LockedFile from './locked-file/locked-file';

interface SigmaO7Props {
  sessionId: string;
}

const Sigma07 = ({ sessionId }: SigmaO7Props) => {
  const [showDetails, setShowDetails] = useState<
    'pykac1' | 'pykac2' | 'deletion' | null
  >(null);

  return (
    <div className='loading-page'>
      <div className='nyx-buttons'>
        <button
          onClick={() => setShowDetails('pykac1')}
          className='choice-button'
          style={
            showDetails === 'pykac1'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          11AUN88920394
        </button>
        <button
          onClick={() => setShowDetails('pykac2')}
          className='choice-button'
          style={
            showDetails === 'pykac2'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          13AUN819222294
        </button>
        <button
          onClick={() => setShowDetails('deletion')}
          className='choice-button'
          style={
            showDetails === 'deletion'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          13DEL899222294
        </button>
      </div>
      {showDetails === 'pykac1' && <AudioPlayer audioFile={Pykac1} />}
      {showDetails === 'pykac2' && (
        <LockedFile
          sessionId={sessionId}
          password='OhenPali'
          isPwdRecovarable={false}
        >
          <AudioPlayer audioFile={Pykac2} />
        </LockedFile>
      )}
      {showDetails === 'deletion' && (
        <LockedFile
          sessionId={sessionId}
          password='PykacOverride'
          title='Sekce uzamčena'
        >
          TODO: přidat zamčený deletion
        </LockedFile>
      )}
    </div>
  );
};

export default Sigma07;
