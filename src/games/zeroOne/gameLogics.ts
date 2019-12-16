import cuid from 'cuid';

import { CreateDartData, OutOption } from 'modules/darts/types';
import { Round } from 'modules/rounds/types';

export const inOptionCheck = (
  inOption: OutOption,
  { dartType, area }: CreateDartData,
) => {
  if (inOption.isCompleted) return inOption;
  switch (inOption.type) {
    case 'none':
      return inOption;
    case 'double':
      return {
        ...inOption,
        isCompleted:
          dartType === 'double' || (dartType === 'bull' && area === 'inner')
            ? true
            : false,
      };
    case 'master':
      return {
        ...inOption,
        isCompleted: dartType !== 'single' ? true : false,
      };
    default:
      return inOption;
  }
};

export const setPoint = (data: CreateDartData, bullSeparate: boolean) => {
  switch (data.dartType) {
    case 'single':
      return Number(data.value);
    case 'double':
      return Number(data.value - 0) * 2;
    case 'triple':
      return Number(data.value - 0) * 3;
    case 'bull':
      return data.area === 'inner'
        ? data.value - 0
        : (data.value - 0) * (bullSeparate ? 1 : 2);
    case 'out':
      return 0;
    default:
      return '';
  }
};

export const checkValid = (data: CreateDartData, inOption: OutOption) => {
  switch (data.dartType) {
    case 'single':
      return inOption.isCompleted;
    case 'double':
      return true;
    case 'triple':
      return inOption.isCompleted || inOption.type !== 'double' ? true : false;
    case 'bull':
      return inOption.isCompleted || inOption.type !== 'double'
        ? true
        : data.area !== 'inner'
        ? false
        : true;
    case 'out':
      return false;
    default:
      return false;
  }
};

interface MakeDartArgs {
  data: CreateDartData;
  round: Round;
  score: any; // todo
}

export const makeDart = ({ data, round, score }: MakeDartArgs) => {
  const arrowDate = new Date();
  const id = cuid();

  return {
    dartType: data.dartType,
    date: arrowDate.toISOString(),
    id,
    outOption: score.outOption,
    isValid: checkValid(data, score.outOption),
    playerId: score.playerId,
    point: setPoint(data, score.bullSeparate),
    roundId: round.id,
    scoreId: score.id,
    value: Number(data.value),
  };
};
