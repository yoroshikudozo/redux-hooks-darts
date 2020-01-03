import { Game } from 'modules/games/types';

import user3 from 'modules/users/mock/resources/user3';

export const game3: Game = {
  gameType: 'zeroOne',
  date: '2019/03/21 22:47:29 GMT+09:00',
  id: '3',
  status: 'playing',
  players: [user3],
  scores: [],
  url: 'asdfasdf3',
};

export default game3;
