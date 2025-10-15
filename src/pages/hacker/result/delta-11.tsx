import { useState } from 'react';
import type { Session } from '../../../context/types';
import LockedFile from './locked-file/locked-file';
import type { ResultTargetProps } from './result';
import './result.css';

const Delta11 = ({ sessionId }: ResultTargetProps) => {
  const [showDetails, setShowDetails] = useState<
    'log' | 'patient2' | 'patient1' | 'patient3' | null
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
      <h2 className='result-title'>
        Interní databáze Salvatorovy Poklikliniky U&nbsp;Všech Svatých
      </h2>
      <div className='nyx-buttons'>
        <button
          onClick={() => setShowDetails('log')}
          className='choice-button'
          style={
            showDetails === 'log'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          41LOG37889411
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
          99AAT67900924
        </button>
        <button
          onClick={() => setShowDetails('patient1')}
          className='choice-button'
          style={
            showDetails === 'patient1'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          73EFT43965808
        </button>
        <button
          onClick={() => setShowDetails('patient3')}
          className='choice-button'
          style={
            showDetails === 'patient3'
              ? { backgroundColor: '#66FFB2', color: '#0A0F0D' }
              : undefined
          }
        >
          49POS49305898
        </button>
      </div>
      {showDetails === 'log' && (
        <LockedFile sessionId='log' password='608090'>
          <div className='text-block'>
            <div className='medical-notes'>
              <h2>Interní poznámky k výpisu</h2>
              <p>
                Záznamy jsou filtrovány podle posledních 40 dnů příjmů do
                <strong>Traumatologie — Vojenské sekce.</strong>
              </p>
              <p>
                Položka <strong>ID 0016</strong> nesouhlasí s běžným formátem
                (záměrně označena jako "skrytá"). Evidence byla z logu vyjmuta a
                přepojena pod alias. Pro bližší informace žádost směřovat na
                vedení JIP.
              </p>
              <hr />
              <h3>
                Salvatorova Polikliniky U Všech Svatých – záznam o pacientech
              </h3>

              <div className='table-wrapper'>
                <table>
                  <thead className='table-head'>
                    <tr>
                      <th>ID</th>
                      <th>Jméno</th>
                      <th>Věk</th>
                      <th>Hodnost</th>
                      <th>Zařazení</th>
                      <th>Datum přijetí</th>
                      <th>Typ zranění</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0001</td>
                      <td>Janek Vorel</td>
                      <td>29</td>
                      <td>rotmistr</td>
                      <td>5. prapor pěchoty</td>
                      <td>2025-09-02</td>
                      <td>odlomená kost: pravé stehno</td>
                    </tr>
                    <tr>
                      <td>0002</td>
                      <td>Karel Benda</td>
                      <td>34</td>
                      <td>svobodník</td>
                      <td>2. průzkumná rota</td>
                      <td>2025-09-05</td>
                      <td>výstřel do ramene (průnik)</td>
                    </tr>
                    <tr>
                      <td>0003</td>
                      <td>Miloš Havel</td>
                      <td>40</td>
                      <td>poručík</td>
                      <td>1. obranná četa</td>
                      <td>2025-09-08</td>
                      <td>popáleniny 2. st. (torzo)</td>
                    </tr>
                    <tr>
                      <td>0004</td>
                      <td>Petra Sýkorová</td>
                      <td>26</td>
                      <td>zdravotník</td>
                      <td>polní špitál B</td>
                      <td>2025-09-12</td>
                      <td>dehydratace, šok</td>
                    </tr>
                    <tr>
                      <td>0005</td>
                      <td>Tomáš Rohlík</td>
                      <td>31</td>
                      <td>desátník</td>
                      <td>7. průzkumný oddíl</td>
                      <td>2025-09-15</td>
                      <td>střelná rána, stehno levé</td>
                    </tr>
                    <tr>
                      <td>0006</td>
                      <td>Radek Miler</td>
                      <td>22</td>
                      <td>svobodník</td>
                      <td>3. dělostřelecký oddíl</td>
                      <td>2025-09-17</td>
                      <td>kontuze hlavy</td>
                    </tr>
                    <tr>
                      <td>0007</td>
                      <td>Hana Králová</td>
                      <td>28</td>
                      <td>rotná</td>
                      <td>logistika</td>
                      <td>2025-09-20</td>
                      <td>zlomenina zápěstí</td>
                    </tr>
                    <tr>
                      <td>0008</td>
                      <td>Ondřej Pilař</td>
                      <td>36</td>
                      <td>kapitán</td>
                      <td>4. obranná četa</td>
                      <td>2025-09-22</td>
                      <td>vnitřní krvácení (břicho)</td>
                    </tr>
                    <tr>
                      <td>0009</td>
                      <td>Lukáš Zeman</td>
                      <td>24</td>
                      <td>svobodník</td>
                      <td>6. rota</td>
                      <td>2025-09-25</td>
                      <td>amputace prstů (úraz)</td>
                    </tr>
                    <tr>
                      <td>0010</td>
                      <td>Viktor Němec</td>
                      <td>33</td>
                      <td>rotmistr</td>
                      <td>průzkum noci</td>
                      <td>2025-09-28</td>
                      <td>výstřel do boku (měkké tkáně)</td>
                    </tr>
                    <tr>
                      <td>0011</td>
                      <td>Marie Dvořáková</td>
                      <td>30</td>
                      <td>rotná</td>
                      <td>sanitka</td>
                      <td>2025-09-30</td>
                      <td>otřes mozku</td>
                    </tr>
                    <tr>
                      <td>0012</td>
                      <td>Pavel Hlinka</td>
                      <td>27</td>
                      <td>svobodník</td>
                      <td>8. útočný prapor</td>
                      <td>2025-10-01</td>
                      <td>řezná rána (břišní stěna)</td>
                    </tr>
                    <tr>
                      <td>0013</td>
                      <td>Adam Beran</td>
                      <td>35</td>
                      <td>poručík</td>
                      <td>2. průzkumná rota</td>
                      <td>2025-10-02</td>
                      <td>střelná rána, levá paže</td>
                    </tr>
                    <tr>
                      <td>0014</td>
                      <td>Jana Křížová</td>
                      <td>23</td>
                      <td>svobodnice</td>
                      <td>medicínská četa</td>
                      <td>2025-10-03</td>
                      <td>dekompresní onemocnění</td>
                    </tr>
                    <tr>
                      <td>0015</td>
                      <td>Milan Urban</td>
                      <td>38</td>
                      <td>štábní praporčík</td>
                      <td>velitelství</td>
                      <td>2025-10-05</td>
                      <td>tupé poranění hrudníku</td>
                    </tr>
                    <tr>
                      <td>0016</td>
                      <td>Ezechiel</td>
                      <td>41</td>
                      <td>neznámá</td>
                      <td>archivní označení: S-TEC-07</td>
                      <td>2025-10-06</td>
                      <td>střelná rána: oblast hrudníku</td>
                    </tr>
                    <tr>
                      <td>0017</td>
                      <td>Radka Poláková</td>
                      <td>21</td>
                      <td>svobodnice</td>
                      <td>9. rota</td>
                      <td>2025-10-06</td>
                      <td>popáleniny (ruce)</td>
                    </tr>
                    <tr>
                      <td>0018</td>
                      <td>Josef Hruška</td>
                      <td>29</td>
                      <td>desátník</td>
                      <td>průzkumný tým C</td>
                      <td>2025-10-07</td>
                      <td>střelná rána do stehna</td>
                    </tr>
                    <tr>
                      <td>0019</td>
                      <td>Olga Štěpánová</td>
                      <td>32</td>
                      <td>rotná</td>
                      <td>evakuační jednotka</td>
                      <td>2025-10-08</td>
                      <td>infekce rány</td>
                    </tr>
                    <tr>
                      <td>0020</td>
                      <td>Kamil Vacek</td>
                      <td>26</td>
                      <td>svobodník</td>
                      <td>11. rota</td>
                      <td>2025-10-09</td>
                      <td>odlomené žebro</td>
                    </tr>
                    <tr>
                      <td>0021</td>
                      <td>Šimon Valenta</td>
                      <td>28</td>
                      <td>svobodník</td>
                      <td>5. prapor</td>
                      <td>2025-10-09</td>
                      <td>kontuze plic</td>
                    </tr>
                    <tr>
                      <td>0022</td>
                      <td>Barbora Novotná</td>
                      <td>25</td>
                      <td>rotná</td>
                      <td>polní kuchyně</td>
                      <td>2025-10-10</td>
                      <td>úraz hlavy (pád)</td>
                    </tr>
                    <tr>
                      <td>0023</td>
                      <td>Daniel Krupa</td>
                      <td>30</td>
                      <td>desátník</td>
                      <td>3. dělostřelecký oddíl</td>
                      <td>2025-10-11</td>
                      <td>prostřelená plíce</td>
                    </tr>
                    <tr>
                      <td>0024</td>
                      <td>Eliška Marešová</td>
                      <td>22</td>
                      <td>svobodnice</td>
                      <td>transportní rota</td>
                      <td>2025-10-12</td>
                      <td>řezná rána na noze</td>
                    </tr>
                    <tr>
                      <td>0025</td>
                      <td>Vojtěch Konečný</td>
                      <td>39</td>
                      <td>poručík</td>
                      <td>průzkumný oddíl</td>
                      <td>2025-10-12</td>
                      <td>polytrauma (po výbuchu)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </LockedFile>
      )}
      {showDetails === 'patient2' && (
        <LockedFile sessionId='klinika' password='DrRath'>
          <div className='text-block'>
            <h2>Salvatorova Poliklinika U Všech Svatých</h2>
            <p>
              <strong>Oddělení:</strong> Traumatologie a hrudní chirurgie
            </p>
            <p>
              <strong>Pacient:</strong> S-TEC-19
            </p>

            <h3>Přijímací protokol – akutní stav</h3>
            <p>
              Pacient nalezen po zásahu projektilu v oblasti dolní části
              hrudníku, s průstřelem páteřního kanálu. Dýchání obtížné, známky
              poškození míchy a ztráta citlivosti od úrovně pasu dolů. Krevní
              tlak kolísavý, vědomí zachováno.
            </p>
            <ul>
              <li>Stabilizace páteře a zajištění dýchacích cest.</li>
              <li>Chirurgické odstranění fragmentů projektilu.</li>
              <li>Hemostatická léčba, transfuzní podpora.</li>
              <li>Neurologické sledování – potvrzeno poškození míchy.</li>
            </ul>
            <p>
              <strong>Závěr:</strong> Stav kritický, pacient přijat na JIP.
              Prognóza nejistá.
            </p>

            <h3>Průběžná zpráva – 3 měsíce po úrazu</h3>
            <p>
              Pacient přežil akutní fázi, vitální funkce stabilní. Motorické
              funkce dolní poloviny těla trvale ztraceny. Rehabilitace probíhá s
              částečnou obnovou citlivosti v oblasti trupu. Dýchání
              kompenzováno, bez nutnosti podpory.
            </p>
            <p>
              <strong>Závěr:</strong> Prognóza trvalá paraplegie. Doporučeno
              dlouhodobé sledování.
            </p>

            <h3>Kontrolní vyšetření – roční kontrola</h3>
            <p>
              Pacient v dobrém psychickém stavu, přizpůsoben životu na
              mechanickém vozíku. Dýchání a oběh stabilní, horní končetiny plně
              funkční. Jizvy zhojené, bez infekčních komplikací.
            </p>
            <p>
              <strong>Závěr:</strong> Pacient přeřazen do invalidního důchodu,
              trvale neschopen služby.
            </p>
          </div>
        </LockedFile>
      )}
      {showDetails === 'patient1' && (
        <LockedFile sessionId='patient1' password='SedmickaVKrabici'>
          <div className='text-block'>
            <article>
              <header>
                <h1>Salvatorova Poliklinika U Všech Svatých</h1>
                <p>
                  <strong>Oddělení:</strong> Traumatologie a hrudní chirurgie
                </p>
                <p>
                  <strong>Pacient:</strong> S-TEC-07
                </p>
                <p>
                  <strong>Dokument:</strong> Přijímací protokol – akutní stav
                </p>
              </header>

              <section>
                <h2>Stav při přijetí</h2>
                <p>
                  Pacient přivezen s vícečetnými střelnými ranami v oblasti
                  hrudníku. Masivní krvácení, známky hypovolemického šoku
                  (bledost, studený pot, tachykardie, hypotenze). Dýchání
                  povrchní, oslabené na levé straně.
                </p>
              </section>

              <section>
                <h2>Provedené úkony</h2>
                <ul>
                  <li>Okamžitá intubace a zajištění dýchacích cest.</li>
                  <li>
                    Zavedení hrudního drénu k evakuaci hemotoraxu a
                    pneumotoraxu.
                  </li>
                  <li>Masivní transfuzní protokol (erymasa, plazma).</li>
                  <li>
                    Nouzová torakotomie, zástava krvácení z poraněné plicní
                    tkáně.
                  </li>
                  <li>Transplantace levé plíce od živého dárce.</li>
                </ul>
                <p>
                  <strong>Závěr:</strong> Stav kritický, pacient přijat na JIP.
                  Prognóza značně nepříznivá.
                </p>
              </section>

              <section>
                <h2>Průběžná zpráva – po stabilizaci</h2>
                <p>
                  Po sérii náročných zákroků se podařilo pacienta stabilizovat.
                  Ztratil značné množství krve, byl opakovaně transfundován.
                  Dýchání nyní spontánní, vitální funkce stabilní, vědomí jasné.
                </p>
                <p>
                  <strong>Poznámka:</strong> Navzdory závažnosti poranění se
                  podařilo zachovat plíce funkční. Jizvy a oslabení hrudní stěny
                  vyžadují dlouhodobou rehabilitaci.
                </p>
                <p>
                  <strong>Závěr:</strong> Pacient sledován na JIP, stav vážný,
                  ale stabilní.
                </p>
              </section>

              <section>
                <h2>Kontrolní vyšetření – roční kontrola</h2>
                <p>
                  Pacient po dlouhé rekonvalescenci a rehabilitaci zcela
                  zotaven. Dýchání bez omezení, fyzická kondice obnovena. Jizvy
                  na hrudníku zhojené, bez známek infekce či komplikací.
                </p>
                <p>
                  <strong>Závěr:</strong> Pacient propuštěn zpět do aktivní
                  služby. Prognóza příznivá.
                </p>
              </section>
            </article>
          </div>
        </LockedFile>
      )}
      {showDetails === 'patient3' && (
        <LockedFile sessionId='patient3' password='DrNeboliTo'>
          <div className='text-block'>
            <article>
              <header>
                <h1>Salvatorova Poliklinika U Všech Svatých</h1>
                <p>
                  <strong>Oddělení:</strong> Traumatologie a hrudní chirurgie
                </p>
                <p>
                  <strong>Pacient:</strong> S-TEC-12
                </p>
                <p>
                  <strong>Dokument:</strong> Přijímací protokol – akutní stav
                </p>
              </header>

              <section>
                <h2>Stav při přijetí</h2>
                <p>
                  Pacient nalezen v bezvědomí po střelbě v sektoru 9. Vícečetné
                  průstřely hrudníku, masivní krvácení, absence dýchání,
                  nepravidelný srdeční rytmus. Na místě podána resuscitace a
                  připojen k přenosnému ventilátoru.
                </p>
              </section>

              <section>
                <h2>Provedené úkony</h2>
                <ul>
                  <li>Nouzová intubace, okamžitá oxygenace.</li>
                  <li>
                    Torakotomie – pokus o zástavu krvácení z plicní tepny.
                  </li>
                  <li>Transfuzní protokol – 4 jednotky erymasy, 2 plazmy.</li>
                  <li>Zajištění oběhu pomocí externího perfuzoru.</li>
                  <li>Přímá defibrilace po zástavě oběhu.</li>
                </ul>
                <p>
                  <strong>Závěr:</strong> Během výkonu došlo k opakované
                  asystolii, nereagoval na resuscitaci. Smrt konstatována v
                  03:47. Tělo předáno patologii k dalšímu vyšetření.
                </p>
              </section>

              <section>
                <h2>Pitva a závěrečná zpráva</h2>
                <p>
                  Pitvou zjištěna destrukce levé plíce a masivní ztráta krve do
                  hrudní dutiny. Projektily pronikly i do pravé síně srdce.
                  Žádné známky infekce ani cizího materiálu. Smrt nastala v
                  důsledku kombinace traumatického šoku a selhání srdce.
                </p>
                <p>
                  <strong>Závěr:</strong> Příčina úmrtí – střelné poranění
                  hrudníku. Prognóza: fatální.
                </p>
              </section>
            </article>
          </div>
        </LockedFile>
      )}
    </LockedFile>
  );
};

export default Delta11;
