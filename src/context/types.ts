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
  isCipherSolved: (id: string) => boolean;
  ciphersList: CipherInfo[];
  markCipherSolved: (key: string) => void;
  markCipherUnsolved: (key: string) => void;
  getSolvedCount: () => number;
  resetAllCiphers: () => void;
};

export const CipherKeys = [
   '533VZP1', '227PRT3' ,'648ZUU2', '694LEX7', '623BEL1', '789PYK6', '753ZFZ3'
]
export type Matrix = string[];

export const MazeMatrix: Record<number, Matrix> = {
  0: ["WI", "WII", "FFWI", "IWFI", "WIIFI"],     
  1: [], // nefunguje
  2: ["FIFIW", "FIWFI", "FWFFI", "IFIFW"],
  3: [], 
  4: [],
  5: ["FIFIW", "FIWFI", "FWFFI", "IFIFW"],
  6: ["FFWI", "IWFI", "WIFI", "IIFW", "FIWFI", "FWFFI", "IFIFW"]
};

export const ROUTE_MAP: Record<string, string> = {
  "533VZP1": "/hacker/result/alpha-01",
  "227PRT3": "/hacker/result/omega-03",
  "648ZUU2": "/hacker/result/nyx-04",
  "694LEX7": "/hacker/result/kv-05",
  "623BEL1": "/hacker/result/tau-06",
  "789PYK6": "/hacker/result/sigma-07",
  "753ZFZ3": "/hacker/result/beta-08",
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
