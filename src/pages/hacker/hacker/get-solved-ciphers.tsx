import type { CipherInfo, Session } from '../../../context/types';

export default function getSolvedCiphersFromSessions(): CipherInfo[] {
  const prefix = 'hack_session_';
  const solved: CipherInfo[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(prefix)) continue;

    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const s = JSON.parse(raw) as Session;
      if (!s || !s.sessionId) continue;

      if (s.completed) {
        solved.push({
          key: s.sessionId,
          solved: true,
          solvedAt: s.completed ?? Date.now(),
          mazeDef: s.mazeDef ?? undefined,
          password: s.password ?? undefined,
        } as unknown as CipherInfo);
      }
    } catch (error) {
      console.error(error)
    }
  }

  return solved;
}
