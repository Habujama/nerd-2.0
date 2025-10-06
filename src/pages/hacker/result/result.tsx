import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadSession, type Session } from '../../../lib/hackSession';

export default function Result() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!sessionId) {
      navigate('/hacker');
      return;
    }
    const loaded = loadSession(sessionId);
    if (!loaded) {
      console.warn('Result: session not found', sessionId);
      navigate('/hacker');
      return;
    }
    setSession(loaded);
  }, [sessionId, navigate]);

  if (!session) return null;

  return (
    <div className='result-page'>
      <h2>Session result: {session.sessionId}</h2>
      <p>Completed: {session.completed ? 'yes' : 'no'}</p>
      <p>Visited nodes: {session.visited?.length ?? 0}</p>
      {/* nabídni volby: zadat heslo nebo spustit minihru */}
      <button onClick={() => navigate(`/hacker`)}>Back</button>
    </div>
  );
}
