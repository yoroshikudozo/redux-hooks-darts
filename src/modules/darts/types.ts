export interface Entity {
  id: string;
  // loading: boolean;
}

type OutOptionType = 'master' | 'double' | 'none';
export type DartType = 'single' | 'double' | 'triple' | 'bull' | 'out';
export type Area = 'inner' | 'outer' | 'none';
type Index = 0 | 1 | 2;

export interface OutOption {
  type: OutOptionType;
  isCompleted?: boolean;
}

export interface Dart extends Entity {
  area: Area;
  dartType: DartType;
  id: string;
  index: Index;
  isValid: boolean;
  point: number;
  roundId: string;
  value: number;
}

export interface DartsResponse {
  darts: Dart[];
}

export interface DartsRequestByGame {
  gameId: string;
}

export interface CreateDartData {
  id: string;
  area?: Area;
  value: number;
  dartType: DartType;
  index: Index;
}

export interface FetchDartsParams {
  id: string;
}

export interface FetchDartParams {
  id: string;
}

export interface FetchDartsByGameParams {
  gameId: string;
}

export interface DartList {
  darts: Dart[];
}

export type FetchDartsResponse = DartList;

export interface CreateDartsParams {
  value: number;
}

export interface DartsBoardData {
  value: number;
  area: Area;
  type: DartType;
}
