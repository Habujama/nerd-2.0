import PasswordGate from '../../../components/hacker-components/pwd-gate';
import type { ResultTargetProps } from './result';

const Omega03 = ({ sessionId }: ResultTargetProps) => (
  <>
    <PasswordGate sessionId={sessionId}>
      <h1>Uzel {sessionId} přístupný</h1>
      <p>Navazování spojení...</p>
    </PasswordGate>
  </>
);

export default Omega03;
