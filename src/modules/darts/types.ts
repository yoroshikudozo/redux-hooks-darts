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

export interface Dart {
  area: Area;
  dartType: DartType;
  date: string;
  gameId: string;
  id: string;
  index: Index;
  isValid: boolean;
  playerId: string;
  point: number;
  roundId: string;
  scoreId: string;
  value: number;
}

export type DartEntity = Dart & Entity;

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

export interface FetchDartsParams {
  id: string;
}

export interface FetchDartsResponse {
  darts: Dart[];
}

export interface FetchDartsResult {
  entities: {
    [key: string]: Dart;
  };
  result: string[];
}

export interface CreateDartsParams {
  value: number;
}

export interface CreateDartsResponse {
  value: number;
}
