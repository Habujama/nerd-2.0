import LockedFile from './locked-file/locked-file.tsx';
import { Details } from './result-types.ts';

export const detailsMap: Record<
  Details,
  {
    code: string;
    content: React.ReactNode;
  }
> = {
  [Details.Service]: {
    code: '27BXR90351247',
    content: (
      <LockedFile sessionId='orion' password='orion7'>
        <div>
          <h3>ZPRÁVA O ÚDRŽBĚ – JEDNOTKA ORION-7</h3>
          <p>Kód: MT-034/22</p>
          <p>Datum: 17. den 6. cyklu, 3. směna</p>
          <p>
            Prováděna rutinní kontrola hydraulických spojů na palubě. Zjištěna
            mikrotrhlina v potrubí chladicího okruhu č. 2. Poškozený segment byl
            vyměněn a zajištěn těsnicí směsí typu Ceraflux. Tlakové testy
            proběhly bez závad. Další kontrola naplánována na 8. den příštího
            cyklu.
          </p>
        </div>
      </LockedFile>
    ),
  },
  [Details.Transport]: {
    code: '83LAN72594602',
    content: (
      <LockedFile sessionId='lg' password='lg192'>
        <div>
          <h3>ZÁZNAM O PŘEPRAVĚ MATERIÁLU</h3>
          <p>Kód: LG-192/B</p>
          <p>Odesláno z: Skladová sekce Beta-5</p>
          <p>Cíl: Modul 3 – Laboratoř pohonných směsí</p>
        </div>
      </LockedFile>
    ),
  },
  [Details.Core]: {
    code: '46MPT11837659',
    content: (
      <LockedFile sessionId='sig' password='sigma'>
        <div>
          <h3>TECHNICKÁ ZPRÁVA – REAKTOROVÉ JÁDRO SIGMA</h3>
          <p>Reaktor pracuje v normálním režimu. Všechny hodnoty v limitu.</p>
          <p>Naměřené hodnoty:</p>
          <ul>
            <li>Stabilita pole: 99,4 %</li>
            <li>Emise částic: pod prahovou úrovní</li>
            <li>Teplotní výkyv: +0,2 K</li>
          </ul>
          <small>
            Poznámka: drobná fluktuace v senzoru č. 4, pravděpodobně způsobena
            kalibrací. Doporučeno sledování, nikoli zásah.
          </small>
        </div>
      </LockedFile>
    ),
  },
  [Details.Delta]: {
    code: '59QEV64283901',
    content: (
      <LockedFile sessionId='session-placeholder' password='delta'>
        <div>
          <h3>SEZNAM NÁHRADNÍCH DÍLŮ – SEKCE DELTA</h3>
          <p>Kód: INV-D/77</p>
          <p>Záznam inventury po výměně plazmových rozvodů:</p>
          <ul>
            <li>24x šroub M6, duralový</li>
            <li>8x modul optického převodníku</li>
            <li>2x jednotka přepěťové ochrany Zetronic</li>
            <li>1x panel řízení Type-B3 (rezervní)</li>
          </ul>
          <small>
            Vše evidováno v systému Inventar-OS. Zbylé komponenty přemístěny do
            skladu Delta-Nord.
          </small>
        </div>
      </LockedFile>
    ),
  },
  [Details.Drone]: {
    code: '72DAR91645820',
    content: (
      <LockedFile sessionId='session-placeholder' password='scout'>
        <div>
          <h3>ZPRÁVA O HAVARII DRONU SCOUT-12</h3>
          <p>Kód: DRN/12/BRK</p>
          <p>Čas incidentu: 04:21 lodního času</p>
          <p>
            Dron ztratil stabilitu při průletu prachovou oblastí a narušil
            vlastní navigační matice. Záznam letu zachován do okamžiku výpadku
            energie. Jednotka bude rozebrána pro analýzu – podezření na selhání
            gyroskopu třetí generace.
          </p>
        </div>
      </LockedFile>
    ),
  },
  [Details.Locked]: {
    code: '10ZUN58420377',
    content: (
      <LockedFile sessionId='session-placeholder' password='feher'>
        Heslo k zážehové stanici: Rv9isBgg
      </LockedFile>
    ),
  },
  [Details.Data]: {
    code: '94HOC33279154',
    content: (
      <LockedFile sessionId='sessiosss' password='sec4b'>
        <div>
          <h3>PROTOKOL O PŘÍSTUPU – DATOVÁ KOMORA 4B</h3>
          <p>Kód: SEC/4B/217</p>
          <p>Dne 19. dne 5. cyklu přistoupili k terminálu:</p>
          <ul>
            <li>Tech. specialista Kellan R. (údržba systému)</li>
            <li>Dozorčí Lt. Varen (ověření integrity záznamů)</li>
          </ul>
          <p>Žádné neoprávněné přístupy nezjištěny.</p>
          <p>
            Systém funguje v normálním režimu. Další audit naplánován za 72
            hodin.
          </p>
        </div>
      </LockedFile>
    ),
  },
  [Details.Calibration]: {
    code: '38TAR73420951',
    content: (
      <LockedFile sessionId='session-placeholder' password='caliber'>
        <div>
          <h3>ZPRÁVA O KALIBRACI – KOMUNIKAČNÍ UZEL EPSILON</h3>
          <p>Kód: 38TAR73420951</p>
          <p>
            DBěhem rutinní kalibrace anténního pole došlo k mírnému posunu
            fázového spektra o 0,03 %. Parametry zkorigovány pomocí algoritmu
            PhasedSync v2.7. Přenosová rychlost plně obnovena. Záznam uložen do
            systému ComLog. Další kontrola doporučena za 48 hodin.
          </p>
        </div>
      </LockedFile>
    ),
  },
  [Details.Fuel]: {
    code: '24LUX68591307',
    content: (
      <LockedFile sessionId='session-placeholder' password='24pal'>
        <div>
          <h3>ZÁZNAM O SPOTŘEBĚ PALIVA – HLAVNÍ POHONNÁ SEKCE</h3>
          <p>Kód: 24LUX68591307</p>
          <p>
            Spotřeba během posledního cyklu překročila plán o 1,8 % v důsledku
            zvýšené korekce trajektorie. Nádrže A–C doplněny z rezervního
            zásobníku.
          </p>
          <p>
            Doporučení: přepočítat kurz podle aktuálních gravitačních odchylek.
            Odpovědný důstojník: Lt. Corren Hale.
          </p>
        </div>
      </LockedFile>
    ),
  },
  [Details.Cryo]: {
    code: '61VEM50239864',
    content: (
      <LockedFile sessionId='session-placeholder' password='4Bsec1'>
        <div>
          <h3>TECHNICKÝ ZÁZNAM – ÚLOŽIŠTĚ 2A</h3>
          <p>Kód: SEC/4B/217</p>
          <p>
            Kontrola integrity chladicích jednotek dokončena. Všechny kontejnery
            vykazují stabilní teplotu −192 °C ± 0,1.
          </p>
          <p>
            Jednotka č. 7 byla krátkodobě odpojena kvůli přepětí, nyní opět v
            provozu.
          </p>
          <p>Zapsal: Tech. Adamus Darn, potvrzeno dozorčím Cmdr. Ikaros N.</p>
        </div>
      </LockedFile>
    ),
  },
  [Details.Gravity]: {
    code: '94HOC33269354',
    content: (
      <LockedFile sessionId='session-placeholder' password='217dat'>
        <div>
          <h3>PROTOKOL O PŘÍSTUPU – DATOVÁ KOMORA 4B</h3>
          <p>Kód: SEC/4B/217</p>
          <p>Dne 19. dne 5. cyklu přistoupili k terminálu:</p>
          <ul>
            <li>Tech. specialista Kellan R. (údržba systému)</li>
            <li>Dozorčí Lt. Varen (ověření integrity záznamů)</li>
          </ul>
          <p>Žádné neoprávněné přístupy nezjištěny.</p>
          <p>
            Systém funguje v normálním režimu. Další audit naplánován za 72
            hodin.
          </p>
        </div>
      </LockedFile>
    ),
  },
  [Details.Life]: {
    code: '47HEN99837452',
    content: (
      <LockedFile sessionId='session-placeholder' password='472grav'>
        <div>
          <h3>ZPRÁVA O PŘENASTAVENÍ GRAVITAČNÍCH GENERÁTORŮ</h3>
          <p>Kód: 47HEN99837452</p>
          <p>
            Generátory 1–3 převedeny do synchronního režimu kvůli nerovnoměrné
            distribuci pole v dolním trupu. Naměřené odchylky sníženy z 4,2 % na
            0,5 %.
          </p>
          <p>Testy potvrdily stabilní chod i při maximálním zatížení.</p>
          <small>Poznámka: doporučeno sledování při startovní sekvenci.</small>
        </div>
      </LockedFile>
    ),
  },
};
