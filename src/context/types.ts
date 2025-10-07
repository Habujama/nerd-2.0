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
  0: ["WI", "WII", "FFWI", "IWFI", "WIIFI"],     
  1: [],
  2: ["FFWI", "IWFI", "WIFI", "IIFW"], 
  3: ["FFWI", "IWFI", "WIFI", "IIFW"],
  4: ["FIFIW", "FIWFI", "FWFFI", "IFIFW"], 
};

export const ROUTE_MAP: Record<string, string> = {
  "533VZP1": "/hacker/target/alpha-01",
  "227PRT3": "/hacker/target/echo-02",
  "648ZUU2": "/hacker/target/omega-03",
  "694LEX7": "/hacker/target/nyx-04",
  "623BEL1": "/hacker/target/kv-05",
  "789PYK6": "/hacker/target/tau-06",
  "753ZFZ3": "/hacker/target/sigma-07",
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
