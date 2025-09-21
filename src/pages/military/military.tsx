import { useState } from 'react';
import LoadingEden from '../../components/loading-eden/loading-eden.js';
import Nav from '../../components/nav';
import Wrapper from '../../components/wrapper';
import './military.css';

const MilitaryPage = () => {
const [loadingStatus, setLoadingStatus] = useState([
  false,
  false,
  false,
  false,
  false,
]);
const [isLoading, setIsLoading] = useState(false);

const resetLoading = () => {
  setLoadingStatus([false, false, false, false, false]);
  setIsLoading(false);
};

return (
  <Wrapper>
    <Nav />
    <div className='military-page'>
      {loadingStatus.filter(Boolean).length > 4 && (
        <h2>Nahrávání dokončeno!</h2>
      )}
      {loadingStatus.filter(Boolean).length < 5 && !isLoading && (
        <span>
          <h3>SMĚRNICE EUFORCOM č. 23/91</h3>
          <h4 style={{ marginBottom: 0 }}>
            Protokol o povinném souhlasu s procedurou kognitivního transferu
          </h4>
          <p>
            Na základě usnesení Rady Unie o vyhlášení výjimečného stavu a v
            souladu s ustanoveními vojenského nařízení č. 23/91 je subjekt
            transferu povinen potvrdit, že byl řádně informován o níže uvedených
            skutečnostech a že jim rozumí:
          </p>
          <ul style={{ listStyle: 'none' }}>
            <li>
              1. Přenos kognitivní identity na orbitální stanici EDEN je
              nevratný a právně závazný.
            </li>
            <li>
              2. Subjekt transferu vstupuje do procedury vědomě, dobrovolně a s
              plnou odpovědností.
            </li>
            <li>
              3. EUFORCOM nenese odpovědnost za vzniklé systémové odchylky,
              ztrátu datových segmentů ani za případnou destabilizaci kognitivní
              integrity.
            </li>
            <li>
              4. Procedura je vykonávána v rámci mimořádných opatření a podléhá
              vojenskému dozoru.
            </li>
          </ul>
          <p>
            Provedením transferu subjekt výslovně stvrzuje, že se vzdává
            veškerých občanských a lidskoprávních nároků, a to v plném rozsahu,
            dle ustanovení Charty nouzového přežití Unie.
          </p>
        </span>
      )}
      {loadingStatus.filter(Boolean).length < 5 && (
        <button
          onClick={() => {
            setLoadingStatus([false, false, false, false, false]);
            setIsLoading(!isLoading);
          }}
          style={{ width: '400px' }}
        >
          {isLoading
            ? 'Přerušit nahrávání do Edenu'
            : 'Zahájit nahrávání do Edenu'}
        </button>
      )}
      {loadingStatus.filter(Boolean).length > 4 && (
        <>
          <p>
            Přenos duševních struktur dokončen. Jednotka je nyní trvale vázána k
            orbitálnímu jádru EDEN. Operace byla vykonána v souladu s Nařízením
            Rady EUFORCOM č. 23/91. Subjekt je považován za{' '}
            <i>digitálně přítomného</i> a podléhá dalšímu nasazení dle rozkazů
            velení a nařízení č. 354/99.
          </p>
        </>
      )}
      {loadingStatus.filter(Boolean).length > 4 && (
        <button
          onClick={() => {
            resetLoading();
            setIsLoading(false);
          }}
          style={{ width: '400px' }}
        >
          Nahrát další
        </button>
      )}
      {isLoading && loadingStatus.filter(Boolean).length < 5 && (
        <div className='loading'>
          {['Kognice', 'Emoce', 'Identita', 'Paměť', 'Podvědomí'].map(
            (label, i) => (
              <span key={label}>
                <LoadingEden
                  setLoadingComplete={() =>
                    setLoadingStatus((prev) => {
                      const next = [...prev];
                      next[i] = true;
                      return next;
                    })
                  }
                  duration={Math.floor(Math.random() * (36 - 19 + 1) + 19)}
                />
                <small style={{ color: loadingStatus[i] ? '#66FFB2' : '#fff' }}>
                  {label}
                </small>
              </span>
            ),
          )}
        </div>
      )}
    </div>
  </Wrapper>
);
};

export default MilitaryPage;
