import { GameEntity } from 'modules/games/types';

import user2 from 'modules/users/mock/resources/user2';

export const game2: GameEntity = {
  gameType: 'zeroOne',
  date: '1578049015808',
  id: '2',
  status: 'playing',
  player: '2',
  players: [user2],
  round: 1,
  rule: {
    bullSeparate: false,
  },
  scores: [],
  url: 'asdfasdf2',
};

export default game2;
