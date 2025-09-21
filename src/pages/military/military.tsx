import { useState } from 'react';
import LoadingEden from '../../components/loading-eden/loading-eden.jsx';
import CrossExplosion from '../../components/loading-eden/cross-explosion.jsx';
import Nav from '../../components/nav';
import Wrapper from '../../components/wrapper';
import './military.css';

const MilitaryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <Wrapper>
      <Nav />
      <div className='military-page'>
        {loadingComplete && <h2>Nahrávání dokončeno!</h2>}
        {!loadingComplete && (
          <>
            <p>
              Zjevení, které Bůh dal Ježíši Kristu, aby ukázal svým služebníkům,
              co se má brzo stát; naznačil to prostřednictvím anděla svému
              služebníku Janovi. Ten dosvědčil Boží slovo a&nbsp;svědectví
              Ježíše Krista, vše, co viděl. Blaze tomu, kdo předčítá slova
              tohoto proroctví, a&nbsp;blaze těm, kdo slyší a&nbsp;zachovávají,
              co je tu napsáno, neboť čas je blízko.
            </p>

            <p>
              Kdo má uši, slyš, co Duch praví církvím: "Tomu, kdo zvítězí, dám
              jíst ze&nbsp;stromu života v&nbsp;Božím ráji.“
            </p>
          </>
        )}
        {!loadingComplete && (
          <button
            onClick={() => {
              setIsLoading(!isLoading);
            }}
            style={{ width: '400px' }}
          >
            {isLoading
              ? 'Přerušit nahrávání do Edenu'
              : 'Zahájit nahrávání do Edenu'}
          </button>
        )}
        {loadingComplete && (
          <>
            <p>
              „A&nbsp;viděl jsem nové nebe a novou zemi, neboť první nebe
              a&nbsp;první země pominuly, a&nbsp;moře již není. A město svaté,
              nový Jeruzalém, jsem viděl sestupovat od Boha z&nbsp;nebe,
              připravené jako nevěsta ozdobená pro svého ženicha. A&nbsp;slyšel
              jsem mocný hlas z&nbsp;trůnu, který říkal: ‚Hle, příbytek Boží je
              mezi lidmi. Bude přebývat s&nbsp;nimi, oni budou jeho lid a sám
              Bůh bude s nimi. Otře jim každou slzu z&nbsp;očí. A smrt již
              nebude; již nebude ani smutek, ani křik, ani bolest, neboť první
              věci pominuly.‘
            </p>
          </>
        )}
        {loadingComplete && (
          <button
            onClick={() => {
              setLoadingComplete(false);
              setIsLoading(false);
            }}
            style={{ width: '400px' }}
          >
            Nahrát další
          </button>
        )}
        {isLoading && !loadingComplete && (
          <LoadingEden setLoadingComplete={setLoadingComplete} />
        )}
        <CrossExplosion trigger={loadingComplete} />
      </div>
    </Wrapper>
  );
};

export default MilitaryPage;
