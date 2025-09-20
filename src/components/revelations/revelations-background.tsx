import { type ReactNode } from 'react';
import './revelations-background.css';

export default function RevelationBackground({
  children,
}: {
  children: ReactNode;
}) {
  const quotes = [
    'A viděl jsem nové nebe a novou zemi...',
    'Hle, přicházím brzy...',
    'Já jsem Alfa i Omega...',
    'A smrt již nebude...',
    'Zvítězí ten, kdo vytrvá...',
  ];

  return (
    <div className='revelation-wrapper'>
      <div className='revelation-background'>
        {quotes.map((q, i) => (
          <div key={i} className={`revelation-column column-${i}`}>
            <span
              style={{
                animationDuration: `${4 + i * 2}s`,
                animationDelay: `${i * 1.5}s`,
              }}
            >
              {q}
            </span>
          </div>
        ))}
      </div>
      <div className='revelation-content'>{children}</div>
    </div>
  );
}
