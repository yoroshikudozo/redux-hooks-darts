import { Round } from 'modules/rounds/types';

export interface ScoreBase {
  id: string;
  gameId: string;
  playerId: string;
  summary: number;
}

export interface Score extends ScoreBase {
  rounds: string[];
}

export interface ScoreEntity extends ScoreBase {
  rounds: Round[];
}

export interface ScoreList {
  scores: Score[];
}

export interface ScoreEntityList {
  scores: ScoreEntity[];
}

export interface FetchScoresByGameParams {
  gameId: string;
}

export interface FetchScoreParams {
  id: string;
}

export interface CreateScoreData {
  playerId: string;
}
