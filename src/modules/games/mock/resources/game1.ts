import { Game } from 'modules/games/types';
import user1 from 'modules/users/mock/resources/user1';

export const game1: Game = {
  gameType: 'zeroOne',
  date: '2019/03/21 22:47:29 GMT+09:00',
  id: '1',
  status: 'playing',
  players: [user1],
  scores: [],
};

export default game1;
