import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { CipherInfo, Role } from './types';
import { AuthContext } from "./types";

const STORAGE_KEY = "postapok_auth_v1";
const DEFAULT_CIPHER_COUNT = 9;

function makeInitialCiphers(count = DEFAULT_CIPHER_COUNT): CipherInfo[] {
  return Array.from({ length: count }).map((_, idx) => ({
    id: idx,
    label: undefined,
    solved: false,
    solvedAt: null,
  }));
}

type StoredAuth = {
  role: Role | null;
  username: string | null;
  solvedCiphers: CipherInfo[];
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [solvedCiphers, setSolvedCiphers] = useState<CipherInfo[]>(() =>
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

      if (Array.isArray(parsed.solvedCiphers)) {
        setSolvedCiphers(parsed.solvedCiphers);
      }
    } catch {
      console.error('error loading state from localStorage');
    }
  }, []);

  // Persist state to localStorage whenever something changes
  useEffect(() => {
    try {
      const payload: StoredAuth = { role, username, solvedCiphers };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error(err);
    }
  }, [role, username, solvedCiphers]);

  const login = (newRole: Role, username: string | null) => {
    setRole(newRole);
    setUsername(username);
    // ⚠️ don't reset solvedCiphers here, so progress persists across logins
  };

  const logout = () => {
    setRole(null);
    setUsername(null);
    // solvedCiphers remain in localStorage, not wiped
  };

  const markCipherSolved = (id: number, label?: string) => {
    if (role !== 'hacker') return; // ignore for non-hackers
    setSolvedCiphers((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) return prev;
      const now = new Date().toISOString();
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        label: label ?? updated[idx].label,
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
    const c = solvedCiphers.find((x) => x.id === id);
    return !!c && c.solved;
  };

  const getSolvedCount = () => solvedCiphers.filter((c) => c.solved).length;

  const resetAllCiphers = () => {
    if (role !== 'hacker') return;
    setSolvedCiphers(makeInitialCiphers(solvedCiphers.length));
  };

  const value = useMemo(
    () => ({
      role,
      username,
      login,
      logout,
      solvedCiphers,
      markCipherSolved,
      markCipherUnsolved,
      isCipherSolved,
      getSolvedCount,
      resetAllCiphers,
    }),
    [role, username, solvedCiphers],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
