import { Entity } from 'modules/common/types';

type DartType = 'single' | 'double' | 'triple' | 'bull';
type Area = 'inner' | 'outer' | 'none';
type Index = 0 | 1 | 2;

export interface Dart extends Entity {
  area: Area;
  dartType: DartType;
  date: string;
  id: string;
  index: Index;
  inOption: boolean;
  isValid: boolean;
  playerId: string;
  point: number;
  roundId: string;
  scoreId: string;
  value: number;
}

export interface DartsResponse {
  darts: Dart[];
}

export interface DartsRequestByGame {
  gameId: string;
}

export interface CreateDartData {
  area?: Area;
  point: number;
}
