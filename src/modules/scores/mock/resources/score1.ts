import { Score } from 'modules/scores/types';

import user1 from 'modules/users/mock/resources/user1';
import user2 from 'modules/users/mock/resources/user2';

export const score1: Score = {
  gameId: '1',
  id: '1',
  players: [user1, user2],
  rounds: [],
  summary: 0,
};

export default score1;
