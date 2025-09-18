import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export type Role = "hacker" | "medic" | "military" | null;

export type CipherInfo = {
  id: number;           // index (0..n-1)
  label?: string;       // volitelný štítek / slovo
  solved: boolean;
  solvedAt?: string | null; // ISO timestamp
};

export type AuthContextType = {
  role: Role;
  login: (newRole: Role) => void;
  logout: () => void;

  // cipher API (pro Hackera)
  solvedCiphers: CipherInfo[];
  markCipherSolved: (id: number, label?: string) => void;
  markCipherUnsolved: (id: number) => void;
  getSolvedCount: () => number;

  // utility
  resetAllCiphers: () => void;
};
