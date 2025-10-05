import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { CipherInfo, Role } from './types';
import { AuthContext } from "./types";

const STORAGE_KEY = "postapok_auth_v1";
const DEFAULT_CIPHER_COUNT = 9;

function makeInitialCiphers(count = DEFAULT_CIPHER_COUNT): CipherInfo[] {
  return Array.from({ length: count }).map((_, idx) => ({
    id: idx,
    key: undefined,
    solved: false,
    solvedAt: null,
  }));
}

type StoredAuth = {
  role: Role | null;
  username: string | null;
  ciphersList: CipherInfo[];
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [ciphersList, setSolvedCiphers] = useState<CipherInfo[]>(() =>
    makeInitialCiphers(),
  );

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed: StoredAuth = JSON.parse(raw);

      setRole(parsed.role ?? null);
      setUsername(parsed.username ?? null);

      if (Array.isArray(parsed.ciphersList)) {
        setSolvedCiphers(parsed.ciphersList);
      }
    } catch {
      console.error('error loading state from localStorage');
    }
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
    // ciphersList remain in localStorage, not wiped
  };

  const markCipherSolved = (id: number, key?: string) => {
    if (role !== 'hacker') return; // ignore for non-hackers
    setSolvedCiphers((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
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

  const markCipherUnsolved = (id: number) => {
    if (role !== 'hacker') return;
    setSolvedCiphers((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx] = { ...updated[idx], solved: false, solvedAt: null };
      return updated;
    });
  };

  const isCipherSolved = (id: number) => {
    const c = ciphersList.find((x) => x.id === id);
    return !!c && c.solved;
  };

  const getSolvedCount = () => ciphersList.filter((c) => c.solved).length;

  const resetAllCiphers = () => {
    if (role !== 'hacker') return;
    setSolvedCiphers(makeInitialCiphers(ciphersList.length));
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
    }),
    [role, username, ciphersList],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
