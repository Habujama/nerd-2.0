import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/use-context.tsx';
import type { CipherInfo } from '../../../context/types.ts';
import Wrapper from '../../../components/wrapper/wrapper.tsx';
import Nav from '../../../components/nav/nav.tsx';
import CipherInput from '../../../components/hacker-components/cipher-input.tsx';
import SolvedCiphers from '../../../components/hacker-components/solved-ciphers.tsx';
import MiniGame from '../../../components/minigame/minigame.tsx';
import { saveSession } from '../../../lib/hackSession';
import './hacker.css';

export default function Hacker() {
  const [activeCipherKey, setActiveCipherKey] = useState<string | null>(null);
  const { ciphersList, isCipherSolved } = useAuth();
  const navigate = useNavigate();

  function startSession(id: string) {
    const normalized = id.trim().toUpperCase();

    const cipher = ciphersList.find((c) => c.key === normalized);
    if (!cipher) {
      console.warn('Cipher not found for session (startSession):', normalized);
      return;
    }

    let session = {
      sessionId: normalized,
      mazeDef: cipher.mazeDef,
      visited: [],
      level: 0,
      maxLevels: cipher.mazeDef.length,
      startedAt: Date.now(),
    };

    if (
      !cipher.mazeDef ||
      !Array.isArray(cipher.mazeDef) ||
      cipher.mazeDef.length === 0
    ) {
      session = {
        sessionId: normalized,
        mazeDef: [],
        visited: [],
        level: 0,
        maxLevels: cipher.mazeDef.length,
        startedAt: Date.now(),
      };
    }

    session = {
      sessionId: normalized,
      mazeDef: cipher.mazeDef,
      visited: [],
      level: 0,
      maxLevels: cipher.mazeDef.length,
      startedAt: Date.now(),
    };

    saveSession(session);

    // synchronní saveSession -> safe pro navigate
    navigate(`/hacker/session/${normalized}`);
  }

  const onButtonClick = (key: string) => {
    if (key === activeCipherKey) {
      setActiveCipherKey(null);
    } else {
      setActiveCipherKey(key);
    }
  };

  const solvedCiphers: CipherInfo[] | false =
    ciphersList.length > 0 && ciphersList.filter((c) => c.solved === true);

  const getCipherId = (activeCipherKey: string) =>
    ciphersList.findIndex((c) => c.key === activeCipherKey);

  return (
    <Wrapper>
      <Nav />
      <div className='medic-panel'>
        <h2>Happy hacking!</h2>
        <div className='hacker-page'>
          <CipherInput ciphersList={ciphersList} startSession={startSession} />

          {activeCipherKey !== null && isCipherSolved(activeCipherKey) && (
            <MiniGame id={getCipherId(activeCipherKey)} />
          )}

          <SolvedCiphers
            solvedCiphers={solvedCiphers}
            activeCipherKey={activeCipherKey ?? null}
            onButtonClick={onButtonClick}
          />
        </div>
      </div>
    </Wrapper>
  );
}
