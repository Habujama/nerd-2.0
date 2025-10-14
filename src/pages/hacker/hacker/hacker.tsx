import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/use-context.tsx';
import type { CipherInfo, Session } from '../../../context/types.ts';
import Wrapper from '../../../components/wrapper/wrapper.tsx';
import Nav from '../../../components/nav/nav.tsx';
import CipherInput from '../../../components/hacker-components/cipher-input.tsx';
import SolvedCiphers from '../../../components/hacker-components/solved-ciphers/solved-ciphers.tsx';
import { saveSession } from '../../../lib/hackSession';
import './hacker.css';
import { useMemo } from 'react';
import getSolvedCiphersFromSessions from './get-solved-ciphers.tsx';

export default function Hacker() {
  const { ciphersList } = useAuth();
  const navigate = useNavigate();

  function startSession(id: string) {
    const normalized = id.trim().toUpperCase();
    const cipher = ciphersList.find((c) => c.key === normalized);

    if (!cipher) {
      console.warn('Cipher not found for session:', normalized);
      return;
    }

    const mazeDef = Array.isArray(cipher.mazeDef) ? cipher.mazeDef : [];

    const session: Session = {
      sessionId: normalized,
      mazeDef,
      visited: [],
      level: 0,
      maxLevels: mazeDef.length,
      password: cipher.password,
      startedAt: Date.now(),
    };

    saveSession(session);
    navigate(`/hacker/session/${normalized}`);
  }

  const solvedCiphers: CipherInfo[] | false = useMemo(() => {
    const arr = getSolvedCiphersFromSessions();
    return arr.length ? arr : false;
  }, []);

  return (
    <Wrapper>
      <Nav />
      <div className='medic-panel'>
        <div className='hacker-page'>
          <CipherInput ciphersList={ciphersList} startSession={startSession} />
          <SolvedCiphers solvedCiphers={solvedCiphers} />
        </div>
      </div>
    </Wrapper>
  );
}
