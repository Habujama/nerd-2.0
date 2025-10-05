import './military.css';

interface LoadingReadyProps {
   setIsLoading: (isLoading: boolean) => void
    setLoadingStatus:  (isLoading: boolean[] | ((prev: boolean[]) => boolean[])) => void
    setLoadingIntercepted: (isLoading: boolean) => void
}

const LoadingReady = ({setIsLoading, setLoadingStatus, setLoadingIntercepted}:LoadingReadyProps) => (
    <>
        <span>
              <h3>SMĚRNICE EUFORCOM č. 23/91</h3>
              <h4 style={{ marginBottom: 0 }}>
                Protokol o povinném souhlasu s procedurou kognitivního transferu
              </h4>
              <p>
                Na základě usnesení Rady Unie o vyhlášení výjimečného stavu a v
                souladu s ustanoveními vojenského nařízení č. 23/91 je subjekt
                transferu povinen potvrdit, že byl řádně informován o níže
                uvedených skutečnostech a že jim rozumí:
              </p>
              <ul style={{ listStyle: 'none' }}>
                <li>
                  1. Přenos kognitivní identity na orbitální stanici EDEN je
                  nevratný a právně závazný.
                </li>
                <li>
                  2. Subjekt transferu vstupuje do procedury vědomě, dobrovolně
                  a s plnou odpovědností.
                </li>
                <li>
                  3. EUFORCOM nenese odpovědnost za vzniklé systémové odchylky,
                  ztrátu datových segmentů ani za případnou destabilizaci
                  kognitivní integrity.
                </li>
                <li>
                  4. Procedura je vykonávána v rámci mimořádných opatření a
                  podléhá vojenskému dozoru.
                </li>
              </ul>
              <p>
                Provedením transferu subjekt výslovně stvrzuje, že se vzdává
                veškerých občanských a lidskoprávních nároků, a to v plném
                rozsahu, dle ustanovení Charty nouzového přežití Unie.
              </p>
        </span>
        <button
              onClick={() => {
                setLoadingStatus([false, false, false, false, false]);
                setIsLoading(true);
                setLoadingIntercepted(false);
              }}
              style={{ width: '400px' }}
            >
              Zahájit nahrávání do Edenu
            </button>
      </>
);

export default LoadingReady;
