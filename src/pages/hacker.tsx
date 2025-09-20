import { useState } from 'react';
import { useAuth } from '../context/use-context';
import type { CipherInfo } from '../context/types';
import Wrapper from '../components/wrapper';
import Nav from '../components/nav';

export default function Hacker() {
  const {
    solvedCiphers,
    markCipherSolved,
    markCipherUnsolved,
    getSolvedCount,
  } = useAuth();

  const [labelInput, setLabelInput] = useState<string>('');

    return (
      <Wrapper>
        <Nav />
        <h1>Hacker panel</h1>
        <p>
          Solved: {getSolvedCount()} / {solvedCiphers.length}
        </p>

        <ul>
          {solvedCiphers.map((c: CipherInfo) => (
            <li key={c.id} style={{ marginBottom: 8 }}>
              <strong>#{c.id + 1}</strong>{' '}
              {c.label ? (
                <>
                  — <em>{c.label}</em>
                </>
              ) : null}{' '}
              {c.solved ? (
                <>
                  <span>✅</span>
                  <small style={{ marginLeft: 8 }}>
                    (solved at {new Date(c.solvedAt ?? '').toLocaleString()})
                  </small>
                  <button
                    style={{ marginLeft: 12 }}
                    onClick={() => markCipherUnsolved(c.id)}
                  >
                    Undo
                  </button>
                </>
              ) : (
                <>
                  <span>❌</span>
                  <input
                    placeholder='label (optional)'
                    value={labelInput}
                    onChange={(e) => setLabelInput(e.target.value)}
                    style={{ marginLeft: 8 }}
                  />
                  <button
                    style={{ marginLeft: 8 }}
                    onClick={() => {
                      markCipherSolved(c.id, labelInput || undefined);
                      setLabelInput('');
                    }}
                  >
                    Mark solved
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </Wrapper>
    );
}
