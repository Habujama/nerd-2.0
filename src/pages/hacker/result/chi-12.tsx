import { useState } from 'react';
import ConnectionLoader from '../../../components/hacker-components/connecting/connecting';
import type { Session } from '../../../context/types';
import LockedFile from './locked-file/locked-file';
import type { ResultTargetProps } from './result';

const Chi12 = ({ sessionId }: ResultTargetProps) => {
const [showDetails, setShowDetails] = useState<
        'chat' | 'canteen' | 'delivery' | null>()
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
          onClick={() => setShowDetails('chat')}
          className='choice-button'
          style={
            showDetails === 'chat'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          32COM43265698
        </button>
      </div>
      {showDetails === 'canteen' && (
        <LockedFile password='modlitba'>
          <div className='text-block'>
            📜 Jídelníček — Kantýna Základny Promethea
            <hr />
            <ul className='list-no-bullets'>
              <li>
                Snídaně: sušené maso ze ztracených stád + rehydratovaný chléb s
                kousky kořenové zeleniny (pokud se podařilo nalézt)
              </li>
              <li>
                Oběd: fazole s konzervovaným tuňákem a kapkou oleje – požehnání,
                že ještě něco zůstalo
              </li>
              <li>
                Večeře: polévka z kořenů a hub + pečivo z kvasu, který přežil
                zkázu
              </li>
              <li>
                Nápoje: dešťová voda filtrována přes plátno, infuze bylin z
                okolních ruin
              </li>
              <li> Neděle: Zbytek z týdne.</li>
            </ul>
            <small>
              “I když svět hoří, žaludek se nezapomíná. Nezbytné jídlo je
              modlitbou, která drží naše tělo i ducha.”
            </small>
          </div>
        </LockedFile>
      )}
      {showDetails === 'delivery' && (
        <LockedFile password='plamenomet'>
          <div className='text-block'>
            📜 Inventurní zpráva
            <hr />
            <p>Zásoby na skladě:</p>
            <ul>
              <li>
                Konzervy (zbytky starého světa): 37 ks – fazole, tuňák, švestky
              </li>
              <li>Voda: 220 litrů – dešťová i z podzemních pramenů</li>
              <li>
                Léky a bylinné směsi: 15 ks – od bolesti hlavy po popáleniny
              </li>
              <li>
                Munice: 450 nábojů různých ráží – nutno chránit před vlhkostí
              </li>
              <li>Plamenomety: 2 ks – stále funkční, požehnání ohně</li>
              <li> Sušené maso: 12 balení – uloženo ve vyhřívané komoře</li>
            </ul>
            <small>
              “Ne všechno lze spočítat, ale každý plamenomet v našem skladu je
              připomínkou, že Ohnivá Brigáda ještě stojí proti Defensorům.”
            </small>
          </div>
        </LockedFile>
      )}
      {showDetails === 'chat' && (
        <LockedFile password={password}>
          <h3>Uzel {sessionId} přístupný</h3>
          <ConnectionLoader />
        </LockedFile>
      )}
    </>
  );
};

export default Chi12;
