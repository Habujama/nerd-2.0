import { useRef, useState } from 'react';
import { Howl } from 'howler';

interface AudioPlayerProps {
  audioFile: string;
}

const AudioPlayer = ({ audioFile }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  if (!soundRef.current) {
    soundRef.current = new Howl({
      src: [audioFile],
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
      <button onClick={togglePlayback} style={{ width: '400px' }}>
        {isPlaying ? '⏸ Zastavit záznam' : '▶ Přehrát záznam'}
      </button>
  );
};

export default AudioPlayer;
