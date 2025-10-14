import ConnectionLoader from '../../../components/hacker-components/connecting/connecting';
import type { Session } from '../../../context/types';
import LockedFile from './locked-file/locked-file';
import type { ResultTargetProps } from './result';

const Omega03 = ({ sessionId }: ResultTargetProps) => {
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
    <>
      <LockedFile
        sessionId={sessionId}
        password={password}
        isPwdRecovarable={false}
      >
        <h3>Uzel {sessionId} přístupný</h3>
        <ConnectionLoader />
      </LockedFile>
    </>
  );
};

export default Omega03;
