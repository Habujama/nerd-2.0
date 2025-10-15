import { useState } from 'react';
import type { Session } from '../../../context/types';
import LockedFile from './locked-file/locked-file';
import type { ResultTargetProps } from './result';
import './result.css';
import LockUnlockSVG from '../../../assets/lock-unlock';

const Epsilon10 = ({ sessionId }: ResultTargetProps) => {
  const [showDetails, setShowDetails] = useState<
    'vyroba' | 'patient2' | 'chemicka' | 'dolovani' | null
  >();
  let password: string = '';
  let parsedSession: Session | undefined = undefined;
  const rawSession = localStorage.getItem(`hack_session_${sessionId}`);
  if (!rawSession) {
    console.error('could not find session password');
  } else {
    parsedSession = JSON.parse(rawSession);
  }

  if (parsedSession?.password) {
    password = parsedSession?.password;
  }

  return (
    <LockedFile sessionId={sessionId} password={password}>
      <h2 className='result-title'>Zabezpečení Očistce</h2>
      <div className='nyx-buttons'>
        <button
          onClick={() => setShowDetails('vyroba')}
          className='choice-button'
          style={
            showDetails === 'vyroba'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          52TRK94628103
        </button>
        <button
          onClick={() => setShowDetails('patient2')}
          className='choice-button'
          style={
            showDetails === 'patient2'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          37BOM21573459
        </button>
        <button
          onClick={() => setShowDetails('chemicka')}
          className='choice-button'
          style={
            showDetails === 'chemicka'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          88KLV70319246
        </button>
        <button
          onClick={() => setShowDetails('dolovani')}
          className='choice-button'
          style={
            showDetails === 'dolovani'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          19ZPD86450782
        </button>
      </div>
      {showDetails === 'vyroba' && (
        <LockedFile sessionId='vyroba' password='Slunce2025'>
          <div className='text-block'>
            <div>
              <h3>Záznam č. 003 – Výroba Hroznů Hněvu</h3>
              <p>
                <strong>Oddělení:</strong> Výrobní sekce, blok H
              </p>
              <p>
                <strong>Datum:</strong> 2025-10-16
              </p>
              <p>
                <strong>Instrukce:</strong> Stabilizovaná Látka je přeměněna na
                Hrozny Hněvu. Proces zahrnuje lisování a formování granátových
                jednotek podle šarže. Každá várka je testována na koncentraci
                výbušného materiálu, musí přesně odpovídat normě 5.1.
              </p>
              <p>
                <strong>Poznámka:</strong> Přísně zakázáno manipulovat s
                neoznačenými jednotkami. Porušení protokolu vede k okamžitému
                záznamu do disciplinárního protokolu.
              </p>
            </div>
          </div>
        </LockedFile>
      )}
      {showDetails === 'patient2' && (
        <LockedFile sessionId='klinika' password='TovarnaHnevu'>
          <LockUnlockSVG />
        </LockedFile>
      )}
      {showDetails === 'chemicka' && (
        <LockedFile sessionId='chemicka' password='Stabilizace'>
          <div className='text-block'>
            <div>
              <h3>Záznam č. 002 – Stabilizace Látky</h3>
              <p>
                <strong>Oddělení:</strong> Chemická sekce, blok S
              </p>
              <p>
                <strong>Datum:</strong> 2025-10-16
              </p>
              <p>
                <strong>Instrukce:</strong> Světice přebírají surovou Látku z
                dolovacího sektoru. Každá jednotka Látky je stabilizována pomocí
                chemických příměsí podle předpisu 12-B. Nesprávná stabilizace
                může vést k explozivnímu nebezpečí.
              </p>
              <p>
                <strong>Poznámka:</strong> Po stabilizaci je každá várka
                zkontrolována kontrolorem kvality a zaznamenána do logu Hrozny
                Hněvu. Výstup je přenášen do výrobní linky blok H.
              </p>
            </div>
          </div>
        </LockedFile>
      )}
      {showDetails === 'dolovani' && (
        <LockedFile sessionId='dolovani' password='Svetice123'>
          <div className='text-block'>
            <div>
              <h3>Záznam č. 001 – Dolování Látky</h3>
              <p>
                <strong>Oddělení:</strong> Dolovací sektor, blok C
              </p>
              <p>
                <strong>Datum:</strong> 2025-10-16
              </p>
              <p>
                <strong>Instrukce:</strong> Vězni jsou přiděleni k dolování
                Látky. Světice dohlížejí na stabilitu tunelů a kontrolují
                výstupní surovinu. Veškerá Látka nesmí vykazovat více než 0,2%
                nestability; nestabilní materiál je okamžitě izolován.
              </p>
              <p>
                <strong>Poznámka:</strong> Každá várka je označena číslem dolu a
                zapsána do centrálního logu. Nedodržení protokolu je považováno
                za závažné porušení interních směrnic.
              </p>
            </div>
          </div>
        </LockedFile>
      )}
    </LockedFile>
  );
};

export default Epsilon10;
