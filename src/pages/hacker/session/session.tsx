import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  nodesFromMatrix,
  type Node,
  type NodeType,
} from '../../../lib/mazeMatrix';
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
  const [feedbackNode, setFeedbackNode] = useState<{
    id: string;
    type: NodeType;
  } | null>(null);
  const [breachFound, setBreachFound] = useState<boolean>(false);
  const { markCipherSolved } = useAuth();

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

    setFeedbackNode({ id: node.id, type: node.type });

    switch (node.type) {
      case 'FAIL': {
        setBreachFound(true);
        setTimeout(() => {
          const reset: Session = { ...session, level: 0, visited: [] };
          saveSession(reset);
          setBreachFound(false);
          navigate('/hacker', { replace: true });
        }, 5000);
        return;
      }

      case 'INACTIVE': {
        setTimeout(() => setFeedbackNode(null), 10000);
        return;
      }

      case 'WIN': {
        const newLevel = (session.level ?? 0) + 1;
        const maxLevels = session.mazeDef!.length;
        const updated = {
          ...session,
          level: newLevel,
          visited: [...(session.visited || []), node.id],
        };

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

        // animace mezi úrovněmi
        setTimeout(() => {
          saveSession(updated);
          setSession(updated);
          const nextPattern = session.mazeDef![newLevel];
          setNodes(nodesFromMatrix(session.sessionId, nextPattern, newLevel));
          setFeedbackNode(null);
        }, 2000);
        return;
      }
    }
  }

  return (
    <Wrapper>
      <button onClick={handleNavigateBack} className='back-button'>
        Zpět na hlavní panel
      </button>
      {breachFound && (
        <div className='error'>
          <h3>
            ⚠️ Zaznamenán neautorizovaný pokus o vniknutí. Přerušuji spojení.
          </h3>
        </div>
      )}
      <Nodes
        nodes={nodes}
        onNodeClick={onNodeClick}
        feedbackNode={feedbackNode}
      />
    </Wrapper>
  );
}
