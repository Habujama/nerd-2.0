import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export type Role = "hacker" | "medic" | "military" | null;

export type CipherInfo = {
  id: number;
  key?: string;       // volitelný štítek / slovo
  solved: boolean;
  solvedAt?: string | null; // ISO timestamp
};

export type AuthContextType = {
  role: Role;
  login: (newRole: Role, username: string | null) => void;
  logout: () => void;
  // cipher API (pro Hackera)
  isCipherSolved: (id: number) => boolean;
  ciphersList: CipherInfo[];
  markCipherSolved: (id: number, label?: string) => void;
  markCipherUnsolved: (id: number) => void;
  getSolvedCount: () => number;

  // utility
  resetAllCiphers: () => void;
};

export const HACKER = [
  {
    username: 'hex',
    password: '#0xE7RA',
  },
  {
    username: 'anathema',
    password: 'echoesOfTalia',
  },
  {
    username: 'luckee_333',
    password: 'manAdealer77!',
  },
];

export const MEDIC = [
  {
    username: 'bernardo',
    password: 'psalm_23',
  },
  {
    username: 'ricardo',
    password: 'bez_slitovani',
  },
  {
    username: 'michelle',
    password: 'ezra_vstal',
  },
];

export const MILITARY = [
  {
    username: 'military',
    password: 'letmein123',
  },
];
