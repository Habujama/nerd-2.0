import { useState } from 'react';
import LoadingEden from '../../components/loading-eden/loading-eden.jsx';
import Nav from '../../components/nav';
import Wrapper from '../../components/wrapper';
import './military.css';

const MilitaryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Wrapper>
      <Nav />
      <div className='military-page'>
        <p>
          Zjevení, které Bůh dal Ježíši Kristu, aby ukázal svým služebníkům, co
          se má brzo stát; naznačil to prostřednictvím anděla svému služebníku
          Janovi. Ten dosvědčil Boží slovo a svědectví Ježíše Krista, vše, co
          viděl. Blaze tomu, kdo předčítá slova tohoto proroctví, a blaze těm, kdo slyší a zachovávají, co je tu napsáno, neboť čas je blízko.
        </p>
        <p>Kdo má uši, slyš, co Duch praví církvím: Tomu, kdo zvítězí, dám jíst ze stromu života v Božím ráji.“</p>

        <button
          onClick={() => {
            setIsLoading(!isLoading);
          }}
          style={{ width: '400px'}}
        >
          {isLoading ? 'Přerušit přenos do Edenu' : 'Zahájit přenos do Edenu'}
        </button>
        {isLoading && <LoadingEden />}
      </div>
    </Wrapper>
  );
};

export default MilitaryPage;
