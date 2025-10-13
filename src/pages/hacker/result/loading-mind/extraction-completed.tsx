import { useRef, useState } from 'react';
import { Howl } from 'howler';
import Belak1 from '../../../../assets/audio/Belak1.mp3';
import './extraction.css';

const ExtractionCompleted = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  if (!soundRef.current) {
    soundRef.current = new Howl({
      src: [Belak1],
      volume: 1,
      onend: () => setIsPlaying(false),
    });
  }

  const togglePlayback = () => {
    const sound = soundRef.current;
    if (!sound) return;

    if (sound.playing()) {
      sound.pause();
      setIsPlaying(false);
    } else {
      sound.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <h2>Extrakce dokončena!</h2>
      <button onClick={togglePlayback} style={{ width: '400px' }}>
        {isPlaying ? '⏸ Zastavit záznam' : '▶ Přehrát záznam'}
      </button>
    </>
  );
};

export default ExtractionCompleted;
