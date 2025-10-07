// src/pages/hacker/session.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { nodesFromMatrix, type Node } from '../../../lib/mazeMatrix';
import {
  loadSession,
  saveSession,
  type Session,
} from '../../../lib/hackSession';
import type { CipherInfo } from '../../../context/types';

export default function Session() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const s = loadSession(sessionId);
    if (!s) {
      // session vůbec neexistuje
      console.warn('Session not found for id:', sessionId);
      navigate('/hacker', { replace: true });
      return;
    }

    if (!s.mazeDef || !Array.isArray(s.mazeDef) || s.mazeDef.length === 0) {
      const storedCiphers = JSON.parse(
        localStorage.getItem('ciphersList') || '[]',
      );
      const cipher = storedCiphers.find((c: CipherInfo) => c.key === sessionId);
      if (
        cipher &&
        Array.isArray(cipher.mazeDef) &&
        cipher.mazeDef.length > 0
      ) {
        s.mazeDef = cipher.mazeDef;
        s.maxLevels = cipher.mazeDef.length;
        saveSession(s);
        console.info(
          'Migrated session mazeDef from ciphersList for',
          sessionId,
        );
      } else {
        const skipped: Session = {
          ...s,
          completed: true,
        };
        saveSession(skipped);
        localStorage.setItem('last_unlocked', s.sessionId);
        navigate(`/hacker/session/${s.sessionId}/result`);
        return;
      }
    }

    // teď už máme s.mazeDef jistě k dispozici
    const level = s.level ?? 0;
    const pattern = s.mazeDef[level];
    if (!pattern) {
      console.warn('Missing pattern for level', level, 'in session', sessionId);
      navigate('/hacker', { replace: true });
      return;
    }

    const generatedNodes = nodesFromMatrix(s.sessionId, pattern, level);
    setSession(s);
    setNodes(generatedNodes);
  }, [sessionId, navigate]);

  function onNodeClick(node: Node) {
    if (!session) return;

    if (node.type === 'INACTIVE') {
      // vizuální feedback implementuj v MazeBoard (class toggle)
      console.log('inactive node clicked:', node.id);
      return;
    }

    if (node.type === 'FAIL') {
      const reset: Session = { ...session, level: 0, visited: [] };
      saveSession(reset);
      setSession(reset);
      const pattern = reset.mazeDef?.[0];
      if (!pattern) {
        navigate('/hacker', { replace: true });
        return;
      }
      setNodes(nodesFromMatrix(reset.sessionId, pattern, 0));
      return;
    }

    if (node.type === 'WIN') {
      const newLevel = (session.level ?? 0) + 1;
      const updated: Session = {
        ...session,
        level: newLevel,
        visited: [...(session.visited || []), node.id],
      };

      const maxLevels = session.mazeDef!.length;

      if (newLevel >= maxLevels) {
        updated.completed = true;
        saveSession(updated);
        localStorage.setItem('last_unlocked', session.sessionId);
        navigate(`/hacker/session/${session.sessionId}/result`);
        return;
      }

      saveSession(updated);
      setSession(updated);

      const nextPattern = session.mazeDef![newLevel];
      setNodes(nodesFromMatrix(session.sessionId, nextPattern, newLevel));
      return;
    }
  }

  return (
    <div style={{ width: '100%', height: 600, position: 'relative' }}>
      <svg viewBox='0 0 800 600' style={{ width: '100%', height: '100%' }}>
        {nodes.map((n) => (
          <g
            key={n.id}
            transform={`translate(${n.x},${n.y})`}
            style={{ cursor: 'pointer' }}
            onClick={() => onNodeClick(n)}
          >
            <circle
              r={40}
              fill={
                n.type === 'WIN'
                  ? '#66FFB2'
                  : n.type === 'FAIL'
                  ? '#ff6b6b'
                  : '#3a3a3a'
              }
            />
            <text x={0} y={6} textAnchor='middle' fontSize={10} fill='#000'>
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
