export const Details = {
    Service: 'SERVICE',
    Transport: 'TRANSPORT',
    Core: 'CORE',
    Delta: 'DELTA',
    Drone: 'DRONE',
    Locked: 'LOCKED',
    Data: 'DATA',
    Calibration: 'CALIBRATION',
    Fuel: 'FUEL',
    Cryo: 'CRYO',
    Gravity: 'GRAVITY',
    Life: 'LIFE'
} as const;

export type Details = (typeof Details)[keyof typeof Details];
