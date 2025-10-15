import { useParams, useNavigate } from 'react-router-dom';
import Alpha01 from './alpha-01';
import Beta08 from './beta-08';
import Omega03 from './omega-03';
import Nyx04 from './nyx-04';
import Kv05 from './kv-05';
import Tau06 from './tau-06';
import Sigma07 from './sigma-07';
import Wrapper from '../../../components/wrapper/wrapper';
import Nav from '../../../components/nav/nav';
import './result.css';
import { NODE_KEY_MAP } from '../../../context/types';
import Chi12 from './chi-12';
import Delta11 from './delta-11';
import Epsilon10 from './epsilon-10';
import Omicron9 from './omicron-9';
import Zeta13 from './zeta-13';
import Gama14 from './gama-14';

export type ResultTargetProps = { sessionId: string };

const RESULT_MAP: Record<string, React.FC<ResultTargetProps>> = {
  'alpha-01': Alpha01,
  'beta-08': Beta08,
  'omega-03': Omega03,
  'nyx-04': Nyx04,
  'kv-05': Kv05,
  'tau-06': Tau06,
  'sigma-07': Sigma07,
  'chi-12': Chi12,
  'delta-11': Delta11,
  'epsilon-10': Epsilon10,
  'omicron-09': Omicron9,
  'zeta-13': Zeta13,
  'gama-14': Gama14,
};

export default function Result() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  console.log(name, 'name');
  if (!name) return <p>Chybí parametr výsledku.</p>;

  const Component = RESULT_MAP[name];
  console.log(RESULT_MAP, 'result');
  if (!Component) return <p>Neznámý výsledek: {name}</p>;

  const sessionId =
    Object.entries(NODE_KEY_MAP).find(([, page]) => page === name)?.[0] ?? '';

  const handleBackClick = () => navigate('/hacker', { replace: true });

  return (
    <Wrapper>
      <Nav />
      <button onClick={handleBackClick} className='back-button'>
        ⬅
      </button>
      <div className='results-wrapper'>
        <Component sessionId={sessionId} />
      </div>
    </Wrapper>
  );
}
