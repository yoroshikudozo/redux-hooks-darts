import { Entity } from 'modules/common/types';
import { Round } from 'modules/rounds/types';
import { User } from 'modules/users/types';

export interface Score extends Entity {
  id: string;
  gameId: string;
  rounds: Round[];
  playerId: string;
  summary: number;
}

export interface ScoreList {
  scores: Score[];
}

export interface FetchScoresByGameParams {
  gameId: string;
}

export interface FetchScoreParams {
  id: string;
}

export interface CreateScoreData {
  players: User[];
}
