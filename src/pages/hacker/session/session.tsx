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
  const [allNodes, setAllNodes] = useState<Node[][]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [feedbackNode, setFeedbackNode] = useState<{
    id: string;
    type: NodeType;
  } | null>(null);
  const [breachFound, setBreachFound] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const { markCipherSolved } = useAuth();

  const handleNavigateBack = () => {
    setAllNodes([]);
    navigate('/hacker', { replace: true });
  };

  // --- Načtení session z localStorage ---
  useEffect(() => {
    if (!sessionId) return;
    const session = loadSession(sessionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!session) {
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
      handleNavigateBack();
      return;
    }

    setSession(session);
    // Vygenerujeme všechny úrovně až do aktuální
    const newAllNodes = session.mazeDef
      .slice(0, level + 1)
      .map((pattern, idx) => nodesFromMatrix(sessionId, pattern, idx));
    setAllNodes(newAllNodes);
  }, [sessionId, navigate]);

  // --- Kliknutí na uzel ---
  function onNodeClick(node: Node, nodeLevel: number) {
    if (!session) return;

    // Ignorujeme kliknutí na starší úrovně
    const currentLevel = session.level ?? 0;
    if (nodeLevel !== currentLevel) return;

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
        const newLevel = currentLevel + 1;
        const maxLevels = session.mazeDef!.length;
        const updated = {
          ...session,
          level: newLevel,
          visited: [...(session.visited || []), node.id],
        };

        if (newLevel >= maxLevels) {
          setFinished(true);
          setTimeout(() => {
            updated.completed = true;
            saveSession(updated);
            localStorage.setItem('last_unlocked', session.sessionId);
            markCipherSolved(session.sessionId);
            const route = ROUTE_MAP[session.sessionId];
            setFinished(false);
            return route
              ? navigate(route)
              : alert('Error: no portal available for this session.');
          }, 3000);
          return;
        }

        // Přidání nové úrovně do pole allNodes
        setTimeout(() => {
          saveSession(updated);
          setSession(updated);
          const nextPattern = session.mazeDef![newLevel];
          setAllNodes((prev) => [
            ...prev,
            nodesFromMatrix(session.sessionId, nextPattern, newLevel),
          ]);
          setFeedbackNode(null);
        }, 500);
        return;
      }
    }
  }

  return (
    <Wrapper>
      <button onClick={handleNavigateBack} className='back-button'>
        Zpět na hlavní panel
      </button>
      {finished && (
        <div className='session-success'>
          <h3>⏳ Odemykám přístup k uzlu...</h3>
        </div>
      )}
      {breachFound && (
        <div className='session-error'>
          <h3>
            ⚠️ Zaznamenán neautorizovaný pokus o vniknutí. Přerušuji spojení...
          </h3>
        </div>
      )}
      <Nodes
        allNodes={allNodes}
        onNodeClick={onNodeClick}
        feedbackNode={feedbackNode}
      />
    </Wrapper>
  );
}
