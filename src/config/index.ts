import CONSTS from 'consts';

interface GameType {
  name: string;
  key: GameKeys;
}

type GameKeys = keyof typeof CONSTS.ROUTES.GAMES;

const games: GameType[] = [
  {
    name: 'Count Up',
    key: 'COUNT_UP',
  },
];

const config = {
  games,
};

export default config;
