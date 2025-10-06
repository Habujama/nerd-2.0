import { useState } from "react";
import { ciphers } from './game-data.ts';

interface MiniGameProps {
  id: number;
}

const MiniGame = ({ id }: MiniGameProps) => {
  const initialGrid: (string | number)[][] =
    ciphers.find((c) => c.id === id)?.grid ?? ciphers[0].grid;

  const size = initialGrid.length;

  // Aktuální pozice hráče
  const [currentPos, setCurrentPos] = useState([0, 0]);
  const [available, setAvailable] = useState([[0, 0]]); // povolené tahy

  function handleClick(row: number, col: number) {
    // smí se kliknout jen na povolené
    if (!available.some(([r, c]) => r === row && c === col)) return;

    const value = initialGrid[row][col];
    if (value === 'FIN') {
      alert('Soubor odemčen');
      return;
    }

    const step = Number(value);
    const newAvailable: ((prevState: number[][]) => number[][]) | number[][] =
      [];

    // spočítáme nové možné tahy
    const directions = [
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

  return (
    <div className='cipher-container'>
      <div
        className='cipher-grid'
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, 60px)`,
          gap: '6px',
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
                  height: '60px',
                  margin: 0,
                  backgroundColor: isCurrent
                    ? '#646cff'
                    : isAvailable
                    ? cell === 'FIN'
                      ? '#FF4D4D'
                      : '#00CC66'
                    : '#0A0F0D',
                  fontWeight: 'bold',
                }}
              >
                {cell}
              </button>
            );
          }),
        )}
      </div>
      <button
        style={{ marginTop: '1rem' }}
        onClick={() => {
          setCurrentPos([0, 0]);
          setAvailable([[0, 0]]);
        }}
      >
        reset
      </button>
    </div>
  );
};

export default MiniGame;
