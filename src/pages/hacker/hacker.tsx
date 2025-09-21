import { useState } from 'react';
import { useAuth } from '../../context/use-context';
import type { CipherInfo } from '../../context/types';
import Wrapper from '../../components/wrapper';
import Nav from '../../components/nav';
import './hacker.css';
import Cipher from './cipher';

export default function Hacker() {
  const [cipherOpen, setCipherOpen] = useState(false);
  const {
    solvedCiphers,
    markCipherSolved,
    markCipherUnsolved,
    getSolvedCount,
  } = useAuth();

  const onButtonClick = (solved: boolean, id: number) => {
    setCipherOpen(!cipherOpen);
    if (solved) {
      markCipherUnsolved(id);
    } else {
      markCipherSolved(id);
    }
  };

  return (
    <Wrapper>
      <Nav />
      <div className='hacker-page'>
        <h3>
          Rozšifrováno: {getSolvedCount()} / {solvedCiphers.length}
        </h3>
        {cipherOpen && <Cipher />}
        <ul className='cipher-list'>
          {solvedCiphers.map((c: CipherInfo) => (
            <li
              key={c.id}
              className={c.solved ? 'cipher-unlocked' : 'cipher-locked'}
            >
              <span>
                <strong>#{c.id + 1}</strong>
                {c.solved && (
                  <small>
                    {' '}
                    (Otevřeno {new Date(c.solvedAt ?? '').toLocaleString()})
                  </small>
                )}
              </span>
              <button onClick={() => onButtonClick(c.solved, c.id)}>
                {c.solved ? 'Uzamknout' : 'Rozšifrovat'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}
