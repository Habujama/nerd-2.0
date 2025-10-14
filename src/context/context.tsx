import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { CipherInfo, Role } from './types';
import { AuthContext, NodePasswords } from './types';
import { CipherKeys, MazeMatrix } from './types';

const STORAGE_KEY = 'postapok_auth_v1';

function makeInitialCiphers(): CipherInfo[] {
  return CipherKeys.map((key, idx) => ({
    id: idx,
    key,
    mazeDef: MazeMatrix[idx] ?? [],
    solved: false,
    password: NodePasswords[idx] ?? null,
    solvedAt: null,
  }));
}

function loadCiphersFromStorage(): CipherInfo[] {
  try {
    const raw = localStorage.getItem('ciphersList');
    if (!raw) return makeInitialCiphers();

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return makeInitialCiphers();
    return parsed.map((c: Partial<CipherInfo>, idx: number) => ({
      id: c.id ?? idx,
      key: c.key ?? CipherKeys[idx],
      mazeDef: Array.isArray(c.mazeDef) ? c.mazeDef : MazeMatrix[idx] ?? [],
      solved: !!c.solved,
      password: c.password ?? NodePasswords[idx] ?? null,
      solvedAt: c.solvedAt ?? null,
    }));
  } catch (err) {
    console.error('loadCiphersFromStorage error:', err);
    return makeInitialCiphers();
  }
}

type StoredAuth = {
  role: Role | null;
  username: string | null;
  ciphersList: CipherInfo[];
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [ciphersList, setCiphersList] = useState<CipherInfo[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Load initial state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // krátké zpoždění zajistí, že localStorage už bude ready po hydrataci
    setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setCiphersList(makeInitialCiphers());
          return;
        }
        const parsed: StoredAuth = JSON.parse(raw);
        setRole(parsed.role ?? null);
        setUsername(parsed.username ?? null);
        setCiphersList(loadCiphersFromStorage());
      } catch (err) {
        console.error('Error loading state from localStorage', err);
      } finally {
        setInitialized(true);
      }
    }, 0);
  }, []);

  // Persist state to localStorage whenever something changes
  useEffect(() => {
    try {
      const payload: StoredAuth = { role, username, ciphersList };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error(err);
    }
  }, [role, username, ciphersList]);

  const login = (newRole: Role, username: string | null) => {
    setRole(newRole);
    setUsername(username);
    // ⚠️ don't reset ciphersList here, so progress persists across logins
  };

  const logout = () => {
    setRole(null);
    setUsername(null);
    // ⚠️ don't reset ciphersList here, so progress persists across logins
  };

  const markCipherSolved = (key: string) => {
    if (role !== 'hacker') return;
    setCiphersList((prev) => {
      const idx = prev.findIndex((c) => c.key === key);
      if (idx === -1) return prev;
      const now = new Date().toISOString();
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        key: key ?? updated[idx].key,
        solved: true,
        solvedAt: now,
      };
      return updated;
    });
  };

  const markCipherUnsolved = (key: string) => {
    if (role !== 'hacker') return;
    setCiphersList((prev) => {
      const idx = prev.findIndex((c) => c.key === key);
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], solved: false, solvedAt: null };
      return updated;
    });
  };

  const isCipherSolved = (key: string) => {
    const c = ciphersList.find((x) => x.key === key);
    return !!c && c.solved;
  };

  const getSolvedCount = () => ciphersList.filter((c) => c.solved).length;

  const resetAllCiphers = () => {
    if (role !== 'hacker') return;
    setCiphersList(makeInitialCiphers());
  };

  const value = useMemo(
    () => ({
      role,
      username,
      login,
      logout,
      ciphersList,
      markCipherSolved,
      markCipherUnsolved,
      isCipherSolved,
      getSolvedCount,
      resetAllCiphers,
      initialized,
    }),
    [role, username, ciphersList],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
