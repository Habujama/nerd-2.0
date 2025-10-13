import { useState } from 'react';
import PowerDisconnect from '../../../assets/power-disconnect';

const Nyx04 = () => {
  const [showDetails, setShowDetails] = useState<
    'electricity' | 'canteen' | 'delivery' | null
  >(null);
  return (
    <>
      <h4>Správa zabezpečení tábora</h4>
      <div className='nyx-buttons'>
        <button
          onClick={() => setShowDetails('electricity')}
          className='choice-button'
        >
          32CON45422311
        </button>
        <button
          onClick={() => setShowDetails('canteen')}
          className='choice-button'
        >
          34CON45488311
        </button>
        <button
          onClick={() => setShowDetails('delivery')}
          className='choice-button'
        >
          39CON45489311
        </button>
      </div>
      {showDetails === 'electricity' && <PowerDisconnect />}
      {showDetails === 'canteen' && (
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
      )}
      {showDetails === 'delivery' && (
        <div className='text-block'>
          🗒️ Záznam o dovozu zásob — Sklad č. 2 / Jižní brána
          <hr />
          <p>
            Datum příjmu: 23. čtvrtletí, 12. den
            <br />
            Přepravce: Kmen Kolovrat / Vozidlo „Osa-12“ (opravený náklaďák)
            <br />
            Doprovod: 2 ozbrojení dobrovolníci
          </p>
          <ul className='list-no-bullets'>
            <li>Palivo (syntetické) ................. 42 litrů</li>
            <li>Voda (technická) .................... 18 nádob</li>
            <li>Konzervy bez označení ............... 23 kusů</li>
            <li>Léky (typ A-B) ............... 11 balení</li>
            <li>Munice (smíšená) .................... 7 beden</li>
            <li>Oblečení z přídělu ................. 3 pytle</li>
          </ul>
          <small>
            Poznámky velitele skladu: „Polovina bedny chybí. Řidič tvrdí, že ji
            sežraly krysy. Zvažujeme vyhlášení nového druhu krys.“
          </small>
        </div>
      )}
    </>
  );
};

export default Nyx04;
