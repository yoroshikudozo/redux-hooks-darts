import { GameIdentifier } from 'config';

import { Dart } from 'modules/darts/types';
import { CountUpRule } from 'modules/rules/types';
import { User } from 'modules/users/types';

type Status = 'end' | 'playing' | 'aborted';

interface Round {
  id: string;
  darts: Dart[];
  scoreId: string;
}

interface Score {
  id: string;
  rounds: Round[];
  gameId: string;
}

export interface GameEntity {
  gameType: GameIdentifier;
  date: string;
  id: string;
  status: Status;
  players: string[];
  scoures: string[];
}

export interface Game {
  gameType: GameIdentifier;
  date: string;
  id: string;
  status: Status;
  players: User[];
  scores: Score[];
  url: string;
}

export interface FetchGamesResponse {
  games: Game[];
}

export interface FetchGameParams {
  id: string;
}

export interface FetchGamesParams {
  playerId: string;
}

export interface CreateGameData {
  id: string;
  gameType: GameIdentifier;
  url: string;
  status: Status;
  players: string[];
  round: number;
  player: string;
  rule: CountUpRule;
}

export interface FetchGamesResult {
  game: {
    entities: { [key: string]: Game };
    result: string[];
  };
}
