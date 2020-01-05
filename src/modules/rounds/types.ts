import { Dart } from 'modules/darts/types';

interface RoundBase {
  id: string;
  round: number;
  scoreId: string;
  summary: number;
}

export interface Round extends RoundBase {
  darts: string[];
}

export interface RoundEntity extends RoundBase {
  darts: Dart[];
}

export interface RoundList {
  rounds: Round[];
}

export interface RoundEntityList {
  rounds: RoundEntity[];
}

export interface FetchRoundParams {
  id: string;
}

export interface FetchRoundsParams {
  playerId: string;
}

export interface CreateRoundData {
  id: string;
}
