import { useState } from 'react';
import AudioPlayer from '../../../components/audio-player/audio-player';
import Ezechiel from '../../../assets/audio/Ezechiel.mp3';

const Gama14 = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

    return (
      <>
      <h2 className='result-title'>
        XP7823
      </h2>
      <div className='nyx-buttons'>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className='choice-button'
          style={
            showDetails
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          20MES31990416
        </button>
      
      </div>
      {showDetails && (
                <div className='text-block'>
                    <AudioPlayer audioFile={Ezechiel} />
          </div>
      )}
      </>
  );
};

export default Gama14;
