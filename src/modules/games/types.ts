import { Dart } from 'modules/darts/types';
import { User } from 'modules/users/types';

type Status = 'end' | 'playing' | 'aborted';
export type GameType = 'zeroOne' | 'countUp' | 'cricket';

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
  gameType: GameType;
  date: string;
  id: string;
  status: Status;
  players: string[];
  scoures: string[];
}

export interface Game {
  gameType: GameType;
  date: string;
  id: string;
  status: Status;
  players: User[];
  scores: Score[];
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
  gameType: GameType;
  status: Status;
  players: string[];
}

export interface FetchGamesResult {
  game: {
    entities: { [key: string]: Game };
    result: string[];
  };
}
