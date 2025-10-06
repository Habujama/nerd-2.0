export type Session = {
  sessionId: string;
  code: string;
  mazeDef: string[];
  visited: string[];
  level: number;
  maxLevels: number;
  startedAt: number;
  completed?: boolean;
};

const keyFor = (sessionId: string) => `hack_session_${sessionId}`;

export function saveSession(session: Session) {
  localStorage.setItem(keyFor(session.sessionId), JSON.stringify(session));
}

export function loadSession(sessionId: string): Session | null {
  const raw = localStorage.getItem(keyFor(sessionId));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch (err) {
    console.error('Failed to parse session', err);
    return null;
  }
}

export function clearSession(sessionId: string) {
  localStorage.removeItem(keyFor(sessionId));
}
