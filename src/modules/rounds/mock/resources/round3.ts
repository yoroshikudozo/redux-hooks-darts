import { RoundEntity } from 'modules/rounds/types';

import dart1 from 'modules/darts/mock/resources/dart1';
import dart2 from 'modules/darts/mock/resources/dart2';
import dart3 from 'modules/darts/mock/resources/dart3';

export const round3: RoundEntity = {
  darts: [dart1, dart2, dart3],
  id: '3',
  round: 3,
  scoreId: '1',
  summary: 80,
};

export default round3;
