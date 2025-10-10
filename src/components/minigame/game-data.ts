type CipherSetup = {
  sessionId: string,
  grid: (string | number)[][],
}

export const ciphers: CipherSetup[] = [
  {sessionId: '227PRT3', grid: [
    [1, 1, 1, 2, 4],
    [1, 3, 2, 3, 2],
    [4, 3, 1, 3, 1],
    [4, 3, 4, 3, 3],
    [1, 2, 3, 3, 'FIN'],
  ] },
  {sessionId: '', grid: [
    [1, 1, 1, 2, 4],
    [1, 3, 2, 3, 2],
    [4, 3, 1, 3, 1],
    [4, 3, 4, 3, 3],
    [1, 2, 3, 3, 'FIN'],
  ],},
  {sessionId: '', grid: [
    [1, 1, 1, 2, 4],
    [1, 3, 2, 3, 2],
    [4, 3, 1, 3, 1],
    [4, 3, 4, 3, 3],
    [1, 2, 3, 3, 'FIN'],
  ],},
];
