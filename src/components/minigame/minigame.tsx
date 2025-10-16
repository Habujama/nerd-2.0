import { useState, useMemo } from 'react';
import { ciphers, difficultCiphers } from './game-data.ts';
import './minigame.css';

interface MiniGameProps {
  setGameWon: (gameWon: boolean) => void;
  difficulty?: 'easy' | 'hard';
}

const MiniGame = ({ difficulty = 'easy', setGameWon }: MiniGameProps) => {
  // Náhodně vybere matici podle obtížnosti
  const initialGrid: (string | number)[][] = useMemo(() => {
    const source = difficulty === 'hard' ? difficultCiphers : ciphers;
    const randomCipher = source[Math.floor(Math.random() * source.length)];
    console.log(
      `🎲 Spuštěna ${difficulty === 'hard' ? 'těžká' : 'lehká'} matice.`,
    );
    return randomCipher.grid;
  }, [difficulty]);

  const size = initialGrid.length;
  const [currentPos, setCurrentPos] = useState<[number, number]>([0, 0]);
  const [available, setAvailable] = useState<[number, number][]>([[0, 0]]);

  function handleClick(row: number, col: number) {
    if (!available.some(([r, c]) => r === row && c === col)) return;

    const value = initialGrid[row][col];
    if (value === 'Obnovit') {
      setGameWon(true);
      return;
    }

    const step = Number(value);
    const newAvailable: [number, number][] = [];
    const directions: [number, number][] = [
      [step, 0],
      [-step, 0],
      [0, step],
      [0, -step],
    ];

    directions.forEach(([dr, dc]) => {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        newAvailable.push([nr, nc]);
      }
    });

    setCurrentPos([row, col]);
    setAvailable(newAvailable);
  }

  function handleReset() {
    setCurrentPos([0, 0]);
    setAvailable([[0, 0]]);
  }

  return (
    <div className='cipher-container'>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, 60px)`,
          gap: '12px',
        }}
      >
        {initialGrid.map((row, r) =>
          row.map((cell, c) => {
            const isAvailable = available.some(
              ([ar, ac]) => ar === r && ac === c,
            );
            const isCurrent = currentPos[0] === r && currentPos[1] === c;

            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleClick(r, c)}
                disabled={!isAvailable && !isCurrent}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '60px',
                  width: '60px',
                  backgroundColor: isCurrent
                    ? '#646cff'
                    : isAvailable
                    ? cell === 'Obnovit'
                      ? '#FF4D4D'
                      : '#00CC66'
                    : '#0A0F0D',
                  border: '1px solid #00CC66',
                  color: '#ffffff',
                  fontFamily: 'monospace',
                }}
              >
                {cell}
              </button>
            );
          }),
        )}
      </div>

      <button onClick={handleReset}>resetovat hru</button>
    </div>
  );
};

export default MiniGame;
