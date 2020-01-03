import { GameEntity } from 'modules/games/types';

import user1 from 'modules/users/mock/resources/user1';

export const game1: GameEntity = {
  gameType: 'zeroOne',
  date: '1578049015808',
  id: '1',
  status: 'playing',
  player: '1',
  players: [user1],
  round: 1,
  rule: {
    bullSeparate: false,
  },
  scores: [],
  url: 'asdfasdf',
};

export default game1;
