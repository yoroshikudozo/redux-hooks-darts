import { RoundEntity } from 'modules/rounds/types';

import dart1 from 'modules/darts/mock/resources/dart1';
import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';

export const round1: RoundEntity = {
  darts: [dart1, dart2, dart3],
  id: '1',
  round: 1,
  scoreId: '1',
  summary: 60,
};

export default round1;
