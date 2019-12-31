import { Game } from 'modules/games/types';

import user2 from 'modules/users/mock/resources/user2';

export const game2: Game = {
  gameType: 'zeroOne',
  date: '2019/03/21 22:47:29 GMT+09:00',
  id: '2',
  status: 'playing',
  players: [user2],
  scores: [],
};

export default game2;
