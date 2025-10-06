import type { CipherInfo } from '../../context/types'

interface SolvedCiphersProps {
  solvedCiphers: CipherInfo[] | false;
  activeCipherKey: string | null;
  onButtonClick: (key: string) => void;
}


const SolvedCiphers = ({
  solvedCiphers,
  activeCipherKey,
  onButtonClick,
}: SolvedCiphersProps) => (
  <ul className='cipher-list'>
    {solvedCiphers &&
      solvedCiphers.map((c: CipherInfo) => (
        <li key={c.key} className='cipher-banner'>
          <span>
            <strong>#{c.key + 1}</strong>
            {c.solved && (
              <small>
                {' '}
                (Otevřeno {new Date(c.solvedAt ?? '').toLocaleString()})
              </small>
            )}
          </span>
          <button onClick={() => onButtonClick(c.key)}>
            {c.key === activeCipherKey ? 'Zavřít soubor' : 'Zobrazit soubor'}
          </button>
        </li>
      ))}
  </ul>
);

export default SolvedCiphers
