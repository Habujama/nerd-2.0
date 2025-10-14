import { useState } from 'react';
import ConnectionLoader from '../../../components/hacker-components/connecting/connecting';
import type { Session } from '../../../context/types';
import LockedFile from './locked-file/locked-file';
import type { ResultTargetProps } from './result';

const Zeta13 = ({ sessionId }: ResultTargetProps) => {
const [showDetails, setShowDetails] = useState<
        'electricity' | 'canteen' | 'delivery' | null>()
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
      <>
    <h4>Správa základny</h4>
      <div className='nyx-buttons'>
        <button
          onClick={() => setShowDetails('canteen')}
          className='choice-button'
          style={
            showDetails === 'canteen'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          43CON46489321
        </button>
        <button
          onClick={() => setShowDetails('delivery')}
          className='choice-button'
          style={
            showDetails === 'delivery'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          31CON77893931
        </button>
        <button
          onClick={() => setShowDetails('electricity')}
          className='choice-button'
          style={
            showDetails === 'electricity'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          32COM43265698
        </button>
          </div>
          {showDetails === 'electricity' && (
              <LockedFile
        sessionId=''
        password=''
      >
        <div className='text-block'>
          📜 Jídelníček — Kantýna Tábora 34
          <hr />
          <ul className='list-no-bullets'>
            <li>
              Pondělí: Polévka z čehokoliv (pravděpodobně brambory), placka na
              oleji.
            </li>
            <li>Úterý: Konzerva typu "maso", rýže z výměny, čaj z jehličí.</li>
            <li>Středa: Houbová směs (zóna 3), chléb z recyklované mouky.</li>
            <li>Čtvrtek: Sojové kostky po staru (bez soji), vařená voda.</li>
            <li>
              Pátek: Ryba z nádrže B, brambory z hydroboxu. Sobota: "Slavnostní"
              guláš – původ neznámý.
            </li>
            <li> Neděle: Zbytek z týdne.</li>
          </ul>
          <small>
            Poznámka: Pokud je jídelní lístek prázdný, znamená to, že zásobování
            opět selhalo. V takovém případě se prosím přihlaste na dobrovolnický
            sběr proteinového materiálu.
          </small>
                  </div>
                  </LockedFile>
      )}
          {showDetails === 'canteen' && (
              <LockedFile
        sessionId=''
        password=''
      >
        <div className='text-block'>
          📜 Jídelníček — Kantýna Tábora 34
          <hr />
          <ul className='list-no-bullets'>
            <li>
              Pondělí: Polévka z čehokoliv (pravděpodobně brambory), placka na
              oleji.
            </li>
            <li>Úterý: Konzerva typu "maso", rýže z výměny, čaj z jehličí.</li>
            <li>Středa: Houbová směs (zóna 3), chléb z recyklované mouky.</li>
            <li>Čtvrtek: Sojové kostky po staru (bez soji), vařená voda.</li>
            <li>
              Pátek: Ryba z nádrže B, brambory z hydroboxu. Sobota: "Slavnostní"
              guláš – původ neznámý.
            </li>
            <li> Neděle: Zbytek z týdne.</li>
          </ul>
          <small>
            Poznámka: Pokud je jídelní lístek prázdný, znamená to, že zásobování
            opět selhalo. V takovém případě se prosím přihlaste na dobrovolnický
            sběr proteinového materiálu.
          </small>
                  </div>
                  </LockedFile>
      )}
      {showDetails === 'delivery' && (
       <LockedFile
        sessionId={sessionId}
        password={password}
      >
        <h3>Uzel {sessionId} přístupný</h3>
        <ConnectionLoader />
      </LockedFile>
      )}
    </>
  );
};

export default Zeta13;
