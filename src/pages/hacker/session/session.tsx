import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { nodesFromMatrix, type Node } from '../../../lib/mazeMatrix';
import { loadSession, saveSession } from '../../../lib/hackSession';
import { ROUTE_MAP, type Session } from '../../../context/types';
import { useAuth } from '../../../context/use-context';
import Wrapper from '../../../components/wrapper/wrapper';
import './session.css';
import Nodes from './node';

export default function Session() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const { login, markCipherSolved } = useAuth();

  const handleNavigateBack = () => navigate('/hacker', { replace: true });

  // --- Načtení session z localStorage ---
  useEffect(() => {
    if (!sessionId) return;
    // TODO: scrollTop on load
    const session = loadSession(sessionId);

    if (!session) {
      console.warn('Session not found for id:', sessionId);
      navigate('/hacker', { replace: true });
      return;
    }

    if (!Array.isArray(session.mazeDef) || session.mazeDef.length === 0) {
      saveSession({ ...session, completed: true });
      localStorage.setItem('last_unlocked', session.sessionId);
      const route = ROUTE_MAP[session.sessionId];
      navigate(route || '/hacker', { replace: true });
      return;
    }

    const level = session.level ?? 0;
    const pattern = session.mazeDef[level];
    if (!pattern) {
      console.warn('Missing pattern for level', level, 'in session', sessionId);
      handleNavigateBack();
      return;
    }

    setSession(session);
    setNodes(nodesFromMatrix(sessionId, pattern, level));
  }, [sessionId, navigate]);

  // --- Kliknutí na uzel ---
  function onNodeClick(node: Node) {
    if (!session) return;

    switch (node.type) {
      case 'INACTIVE':
        // TODO: implementovat vizuální response
        return;

      case 'FAIL': {
        // TODO: implementovat vizuální response
        const reset: Session = { ...session, level: 0, visited: [] };
        saveSession(reset);
        setSession(null);
        setNodes([]);
        login(null, null);
        navigate('/hacker', { replace: true });
        return;
      }

      case 'WIN': {
        // TODO: implementovat vizuální response
        const newLevel = (session.level ?? 0) + 1;
        const maxLevels = session.mazeDef!.length;
        const updated = {
          ...session,
          level: newLevel,
          visited: [...(session.visited || []), node.id],
        };

        // Výhra celé session
        if (newLevel >= maxLevels) {
          updated.completed = true;
          saveSession(updated);
          localStorage.setItem('last_unlocked', session.sessionId);
          markCipherSolved(session.sessionId);
          const route = ROUTE_MAP[session.sessionId];
          return route
            ? navigate(route)
            : alert('Error: no portal available for this session.');
        }

        // Další level
        saveSession(updated);
        setSession(updated);
        const nextPattern = session.mazeDef![newLevel];
        setNodes(nodesFromMatrix(session.sessionId, nextPattern, newLevel));
        return;
      }
    }
  }

  return (
    <Wrapper>
      <button onClick={handleNavigateBack} className='back-button'>
        Zpět na hlavní panel
      </button>
      <Nodes nodes={nodes} onNodeClick={onNodeClick} />
    </Wrapper>
  );
}
