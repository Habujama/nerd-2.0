import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/use-context.tsx';
import type { CipherInfo } from '../../../context/types.ts';
import Wrapper from '../../../components/wrapper/wrapper.tsx';
import Nav from '../../../components/nav/nav.tsx';
import CipherInput from '../../../components/hacker-components/cipher-input.tsx';
import SolvedCiphers from '../../../components/hacker-components/solved-ciphers.tsx';
import { saveSession } from '../../../lib/hackSession';
import './hacker.css';

export default function Hacker() {
  const [activeCipherKey, setActiveCipherKey] = useState<string | null>(null);
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

    const session = {
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

  const onButtonClick = (key: string) => {
    if (key === activeCipherKey) {
      setActiveCipherKey(null);
    } else {
      setActiveCipherKey(key);
    }
  };

  const solvedCiphers: CipherInfo[] | false =
    ciphersList.length > 0 && ciphersList.filter((c) => c.solved === true);

  console.log(solvedCiphers, 'solved ciphers');

  return (
    <Wrapper>
      <Nav />
      <div className='medic-panel'>
        <h2>Happy hacking!</h2>
        <ol style={{ textAlign: 'left' }}>
          <li>✅ 533VZP1: alpha-01 - labyrint - zpráva ve stanici Defensorů</li>
          <li>
            ✅ 227PRT3: omega-03 - heslo bez minihry - chatovací program s
            brigádou
          </li>
          <li>648ZUU2: nyx-04 - uzel 32CON45422311 - vypnutí elektřiny</li>
          <li>
            694LEX7: kv-05 - bez zabezpečení - nahrávání duše, potom audio
          </li>
          <li>623BEL1: tau-06 - heslo + minihra - audio Belib</li>
          <li>
            789PYK6: sigma-07 - labyrint + heslo + minihra - 3 uzly:
            <ul>
              <li>bez zabezpečení - audio Pykač</li>
              <li>heslo bez minihry - audio Pykač 2</li>
              <li>uzel č. 33CON33333333: heslo s minihrou - mazání Pykače</li>
            </ul>
          </li>
          <li>
            753ZFZ3 - beta-08 - nejsložitější možné zabezpečení - heslo k
            Fehérově tabletu
          </li>
        </ol>
        <div className='hacker-page'>
          <CipherInput ciphersList={ciphersList} startSession={startSession} />

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
