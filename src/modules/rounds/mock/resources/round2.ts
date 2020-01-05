import { RoundEntity } from 'modules/rounds/types';

import dart1 from 'modules/darts/mock/resources/dart1';
import dart2 from 'modules/darts/mock/resources/dart2';

export const round2: RoundEntity = {
  darts: [dart1, dart2],
  id: '2',
  round: 2,
  scoreId: '1',
  summary: 40,
};

export default round2;
