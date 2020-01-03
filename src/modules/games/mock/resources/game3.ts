import { GameEntity } from 'modules/games/types';

import user3 from 'modules/users/mock/resources/user3';

export const game3: GameEntity = {
  gameType: 'zeroOne',
  date: '1578049015808',
  id: '3',
  status: 'playing',
  player: '3',
  players: [user3],
  round: 1,
  rule: {
    bullSeparate: false,
  },
  scores: [],
  url: 'asdfasdf3',
};

export default game3;
