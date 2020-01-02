import CONSTS from 'consts';

export interface GameConfig {
  identifier: GameIdentifier;
  name: string;
  key: GameKeys;
}

type GameKeys = keyof typeof CONSTS.ROUTES.GAMES;
export type GameIdentifier = 'zeroOne' | 'countUp' | 'cricket';

const countUp: GameConfig = {
  identifier: 'countUp',
  name: 'Count Up',
  key: 'COUNT_UP',
};

const games = {
  countUp,
};

const config = {
  games,
};

export default config;
