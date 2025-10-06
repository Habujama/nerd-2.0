import { createContext } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export type Role = "hacker" | "medic" | "military" | null;

export type CipherInfo = {
  id: number;
  key: string;
  mazeDef: string[];
  solved: boolean;
  password?: string;
  solvedAt?: string | null;
};

export type AuthContextType = {
  role: Role;
  login: (newRole: Role, username: string | null) => void;
  logout: () => void;
  // cipher API (pro Hackera)
  isCipherSolved: (id: string) => boolean;
  ciphersList: CipherInfo[];
  markCipherSolved: (key: string) => void;
  markCipherUnsolved: (key: string) => void;
  getSolvedCount: () => number;

  // utility
  resetAllCiphers: () => void;
};

export const CipherKeys = [
   '533VZP1', '648ZUU2', '648ZUU2', '694LEX7', '623LAM1'
]
export type Matrix = string[]; // each element is e.g. "WIF" or "IFIW"

export const MazeMatrix: Record<number, Matrix> = {
  0: ["WI", "WII"],     
  1: ["WFI", "IWFI", "WI"],
  2: ["FFWI", "IWFI", "WIFI", "IIFW"], 
  3: ["FFWI", "IWFI", "WIFI", "IIFW"],
  4: ["FIFIW", "FIWFI", "FWFFI","IFIFW"], 
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
