import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { gsap } from 'gsap';
import './audio-player.css';

interface AudioPlayerProps {
  audioFile: string;
  disabled?: boolean;
}

const AudioPlayer = ({ audioFile, disabled }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const barsRef = useRef<SVGRectElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Inicializace zvuku
  if (!soundRef.current) {
    soundRef.current = new Howl({
      src: [audioFile],
      volume: 1,
      onend: () => setIsPlaying(false),
    });
  }

  // Animace equalizeru
  useEffect(() => {
    if (!barsRef.current.length) return;

    if (isPlaying) {
      // vytvoříme timeline pro "blikání" sloupců
      const tl = gsap.timeline({ repeat: -1 });
      barsRef.current.forEach((bar, i) => {
        tl.to(
          bar,
          {
            scaleY: gsap.utils.random(0.3, 1.2),
            transformOrigin: 'bottom center',
            duration: gsap.utils.random(0.2, 0.5),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.1,
          },
          0,
        );
      });
      tlRef.current = tl;
    } else {
      // zastavíme animaci
      tlRef.current?.kill();
      gsap.to(barsRef.current, {
        scaleY: 0.2,
        transformOrigin: 'bottom center',
        duration: 0.5,
        ease: 'power2.out',
      });
    }

    return () => {
      tlRef.current?.kill();
    };
  }, [isPlaying]);

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
    <div className='audio-wrapper'>
      <button onClick={togglePlayback} disabled={disabled}>
        {isPlaying ? '⏸ Zastavit záznam' : '▶ Přehrát záznam'}
      </button>
      <svg width='300' height='80' viewBox='0 0 300 80'>
        {Array.from({ length: 13 }).map((_, i) => (
          <rect
            key={i}
            ref={(el) => {
              if (el) barsRef.current[i] = el;
            }}
            x={20 + i * 20}
            y={20}
            width='10'
            height='40'
            fill={i % 2 === 0 ? '#00CC66' : '#66FFB2'}
            style={{
              transformOrigin: 'bottom center',
              transformBox: 'fill-box',
            }}
          />
        ))}
        <line
          strokeWidth={3}
          stroke='#00CC66'
          x1={0}
          x2={300}
          y1={79}
          y2={79}
        />
      </svg>
    </div>
  );
};

export default AudioPlayer;
