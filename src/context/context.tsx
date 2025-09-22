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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // load stored state (role + ciphers) from localStorage
  const [role, setRole] = useState<Role>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.role ?? null;
    } catch {
      return null;
    }
  });

  const [solvedCiphers, setSolvedCiphers] = useState<CipherInfo[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return makeInitialCiphers();
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.solvedCiphers)) return parsed.solvedCiphers;
      return makeInitialCiphers();
    } catch {
      return makeInitialCiphers();
    }
  });

  // persist role + solvedCiphers to localStorage whenever they change
  useEffect(() => {
    try {
      const payload = { role, solvedCiphers };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error(err);
    }
  }, [role, solvedCiphers]);

  const login = (newRole: Role) => {
    setRole(newRole);
  };

  const logout = () => {
    setRole(null);
  };

  const markCipherSolved = (id: number, label?: string) => {
    if (role !== 'hacker') return;
    setSolvedCiphers((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx === -1) {
        // pokud id mimo rozsah, ignoruj
        return prev;
      }
      const now = new Date().toISOString();
      const updated = prev.slice();
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
      const updated = prev.slice();
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
    setSolvedCiphers(makeInitialCiphers(solvedCiphers.length));
  };

  const value = useMemo(
    () => ({
      role,
      login,
      logout,
      solvedCiphers,
      markCipherSolved,
      markCipherUnsolved,
      isCipherSolved,
      getSolvedCount,
      resetAllCiphers,
    }),
    [role, solvedCiphers],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
