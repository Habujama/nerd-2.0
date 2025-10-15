import { useState } from 'react';
import type { Session } from '../../../context/types';
import LockedFile from './locked-file/locked-file';
import type { ResultTargetProps } from './result';

const Omicron9 = ({ sessionId }: ResultTargetProps) => {
  const [showDetails, setShowDetails] = useState<
    'gate' | 'access' | 'patients' | null
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
    <LockedFile
      sessionId={sessionId}
      password={password}
      isPwdRecovarable={false}
    >
      <>
        <h2>Očistec - interní úložiště</h2>
        <div className='nyx-buttons'>
          <button
            onClick={() => setShowDetails('access')}
            className='choice-button'
            style={
              showDetails === 'access'
                ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
                : undefined
            }
          >
            21ADD57389410
          </button>
          <button
            onClick={() => setShowDetails('patients')}
            className='choice-button'
            style={
              showDetails === 'patients'
                ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
                : undefined
            }
          >
            22PAT67868920
          </button>
          <button
            onClick={() => setShowDetails('gate')}
            className='choice-button'
            style={
              showDetails === 'gate'
                ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
                : undefined
            }
          >
            23GAT43365888
          </button>
        </div>
        {showDetails === 'access' && (
          <LockedFile sessionId='aa' password='BezpecnostJeZaklad'>
            <div className='text-block'>
              Přístupové údaje k bezpečnostní bráně Očistce
              <hr />
              <p>
                1010110101111010101010101010101010101010101A101010101010010
                010010110110011110100101010000001101010100011r11111110101011
                101011010111101010101010101010101010101010110i1010101010010
                0100101101100111101001010100000011010101000111a1111110101011
                100011001přístupový956OCB9port010110100101011010d10010101001
                101001010110010110101010110111101001101011011010n1110010101
                101011010111101010101010101010101010101010110101a010101001
                1010110101111010101010101010101010101010101101010101010010
                01001011011001111010010101000000110101010001111111110101011
              </p>
            </div>
          </LockedFile>
        )}
        {showDetails === 'patients' && (
          <LockedFile sessionId='svetice' password='ZivotSvetice'>
            <div className='text-block'>
              <h3>LÉKAŘSKÁ ZPRÁVA č. 47/9</h3>
              <p>Vypracoval: medik druhého stupně Julián Kord</p>
              <p>Oddělení: biologicko-stabilizační sekce, blok C</p>
              <p>Datum vyhotovení: 3. října</p>
              <h4>ÚVOD</h4>
              <p>
                Na základě pokynu dozorce sekce byl proveden měsíční souhrn
                zdravotních záznamů deseti Světic nasazených ke stabilizaci
                Hroznů hněvu. Při procesu stabilizace dochází k přímému kontaktu
                nervových zakončení s bioenergetickým jádrem Hroznů, což
                způsobuje hluboké fyziologické a psychické poškození. Průměrná
                životnost Světice po zahájení služby: 26 dní. Smrt nastává
                obvykle v důsledku úplného selhání nervové soustavy, vnitřního
                krvácení a rozpadu tkání.
              </p>
              <hr />
              <h4>ZÁZNAMY O PACIENTKÁCH</h4>
              <ul className='list-no-bullets'>
                <li>
                  Světice Amara V.
                  <ul>
                    <li>Věk: 21 let</li>
                    <li>Doba služby: 18 dní</li>
                    <li>
                      Příčina úmrtí: prasknutí cévního systému v oblasti lebky,
                      silné křeče, ztráta vědomí.
                    </li>
                    <li>
                      Poznámka: krátce před smrtí opakovala slova „v hroznu je
                      světlo“.
                    </li>
                  </ul>
                </li>
                <li>
                  Světice Neria L.
                  <ul>
                    <li>Věk: 24 let</li>
                    <li>Doba služby: 29 dní</li>
                    <li>
                      Tělesný stav: úplná ztráta kůže na dlaních a pažích,
                      oslepnutí.
                    </li>
                    <li>Smrt: po záchvatu hysterie, následně zástava srdce.</li>
                  </ul>
                </li>
                <li>
                  Světice Irena M.
                  <ul>
                    <li>Věk: 27 let</li>
                    <li>Doba služby: 33 dní</li>
                    <li>
                      Před smrtí nevykazovala známky rozumu; tělo deformováno
                      vlivem přetížení tkání.
                    </li>
                    <li>
                      Pitva: v oblasti hrudníku nalezeny stopy žhnoucího vlákna
                      Hněvu.
                    </li>
                  </ul>
                </li>
                <li>
                  Světice Kora E.
                  <ul>
                    <li>Věk: 19 let</li>
                    <li>Doba služby: 22 dní</li>
                    <li>Zjištěno silné krvácení z očí, nosu a uší.</li>
                    <li>Poslední záznam: prosila, aby byla „odpojena“.</li>
                  </ul>
                </li>
                <li>
                  Světice Melina T.
                  <ul>
                    <li>Věk: 23 let</li>
                    <li>Doba služby: 17 dní</li>
                    <li>Při pitvě nalezeny zbytky Hroznové hmoty v plicích.</li>
                    <li>
                      Závěr: asfyxie kombinovaná s masivním vnitřním přehřátím.
                    </li>
                  </ul>
                </li>
                <li>
                  Světice Runa D.
                  <ul>
                    <li>Věk: 25 let</li>
                    <li>Doba služby: 31 dní</li>
                    <li>Po poslední směně upadla do katatonického stavu.</li>
                    <li>
                      Úmrtí: spontánní rozpad svalové tkáně, smrt během 12
                      minut.
                    </li>
                  </ul>
                </li>
                <li>
                  Světice Elara P.
                  <ul>
                    <li>Věk: 20 let</li>
                    <li>Doba služby: 24 dní</li>
                    <li>
                      Psychické zhroucení, následně pokus o útěk. Zadržena a
                      napojena zpět.
                    </li>
                    <li>Zemřela na šok při opětovném kontaktu s Hroznem.</li>
                  </ul>
                </li>
                <li>
                  Světice Lirene F.
                  <ul>
                    <li>Věk: 28 let</li>
                    <li>Doba služby: 27 dní</li>
                    <li>
                      Během služby zpívala staré modlitby, později jen šeptala
                      „bolí to“.
                    </li>
                    <li>Úmrtí: totální zástava orgánů.</li>
                  </ul>
                </li>
                <li>
                  Světice Salvia R.
                  <ul>
                    <li>Věk: 22 let</li>
                    <li>Doba služby: 20 dní</li>
                    <li>
                      Pozorováno: extrémní opuch mozkových tkání, prudké výkyvy
                      teploty těla.
                    </li>
                    <li>Závěr: smrt v důsledku roztržení míchy.</li>
                  </ul>
                </li>
                <li>
                  Světice Tyra J.
                  <ul>
                    <li>Věk: 26 let</li>
                    <li>Doba služby: 30 dní</li>
                    <li>Poslední slova: „Hněv je spasen.“</li>
                    <li>
                      Tělo po smrti stále vyzařovalo teplo po dobu 6 hodin.
                    </li>
                  </ul>
                </li>
              </ul>
              <hr />
              <h3>ZÁVĚREČNÉ SHRNUTÍ</h3>
              <p>
                Ze všech deseti případů nebyl zaznamenán jediný případ přežití
                déle než 35 dní. Všechna těla vykazovala známky rozsáhlého
                vnitřního poškození a hluboké psychické degradace. Domnívám se,
                že proces stabilizace Hroznů hněvu není slučitelný s dlouhodobým
                přežitím lidského organismu. Přesto vedení továrny trvá na
                pokračování programu s odkazem na „božský účel“.
              </p>
              <p>
                S úctou,
                <br />
                Medik Julián Kord
                <br />
                Tovární ústav pro bioenergetickou stabilizaci
                <br />
                Blok C – Zdravotní oddělení <br />
              </p>
              <div style={{ marginBottom: '4rem' }} />
            </div>
          </LockedFile>
        )}
        {showDetails === 'gate' && (
          <LockedFile sessionId='svetice' password='Letenka'>
            <div className='text-block'>
              <>
                <h3>INTERNÍ OZNÁMENÍ č. E-17/212</h3>
                <p>
                  TOVÁRNA NA HROZNY HNĚVU – OČISTEC, BLOK A Oddělení řízení
                  personálu Světic
                </p>
                <hr />
                <h4>VĚC: Povolení k vyslání Světice Diany do Edenu</h4>
                <p>
                  Na základě rozhodnutí Rady pro stabilizaci ze dne 12. října, a
                  po schválení Ústředním dozorem výroby, se potvrzuje, že:
                </p>
                <p>
                  Ariadna., hlavní dozorčí sekce Očistec, je tímto oprávněna
                  vyslat Světici Dianu (identifikace S-43/ED) do Edenu, za
                  účelem zahájení procesu vyšší transmutace a duchovního
                  očištění po dokončení služby.
                </p>
                <p>
                  Vyslání bylo posouzeno jako v souladu s Protokolem o udržení
                  rovnováhy a potvrzeno podpisem vedoucího Rady.
                </p>
                <p>
                  Přesun bude realizován dne 13. října v 06:40 místního času,
                  pod dohledem sekce Bioenergetické bezpečnosti. Po dokončení
                  přechodu bude tělo Světice vyňato z evidence.
                </p>
              </>
            </div>
          </LockedFile>
        )}
      </>
    </LockedFile>
  );
};

export default Omicron9;
