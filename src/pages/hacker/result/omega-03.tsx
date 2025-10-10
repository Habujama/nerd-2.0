import ConnectionLoader from '../../../components/hacker-components/connecting/connecting';
import PasswordGate from '../../../components/hacker-components/pwd-gate';
import type { ResultTargetProps } from './result';

const Omega03 = ({ sessionId }: ResultTargetProps) => (
  <>
    <PasswordGate sessionId={sessionId}>
      <h3>Uzel {sessionId} přístupný</h3>
      <ConnectionLoader />
    </PasswordGate>
  </>
);

export default Omega03;
