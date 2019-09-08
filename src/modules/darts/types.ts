export interface Entity {
  id: string;
  loading: boolean;
}

type OutOptionType = 'master' | 'double' | 'none';
type DartType = 'single' | 'double' | 'triple' | 'bull' | 'out';
type Area = 'inner' | 'outer' | 'none';
type Index = 0 | 1 | 2;

export interface OutOption {
  type: OutOptionType;
  isCompleted?: boolean;
}

export interface Dart extends Entity {
  area: Area;
  dartType: DartType;
  date: string;
  id: string;
  index: Index;
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
  value: number;
  dartType: DartType;
  index: Index;
}

interface FetchDartsParams {
  value: number;
}

interface FetchDartsResponse {
  darts: Dart[];
}
