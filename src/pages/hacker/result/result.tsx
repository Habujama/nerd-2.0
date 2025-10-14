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

export type ResultTargetProps = { sessionId: string };

const RESULT_MAP: Record<string, React.FC<ResultTargetProps>> = {
  'alpha-01': Alpha01,
  'beta-08': Beta08,
  'omega-03': Omega03,
  'nyx-04': Nyx04,
  'kv-05': Kv05,
  'tau-06': Tau06,
  'sigma-07': Sigma07,
};

export default function Result() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  if (!name) return <p>Chybí parametr výsledku.</p>;

  const Component = RESULT_MAP[name];
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
