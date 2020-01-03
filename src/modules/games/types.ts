import { GameIdentifier } from 'config';

import { Dart } from 'modules/darts/types';
import { CountUpRule } from 'modules/rules/types';
import { Score } from 'modules/scores/types';
import { User } from 'modules/users/types';

type Status = 'finished' | 'playing' | 'aborted';

interface Round {
  id: string;
  darts: Dart[];
  scoreId: string;
}

interface GameBase {
  date: string;
  gameType: GameIdentifier;
  id: string;
  player: string;
  round: number;
  rule: CountUpRule;
  status: Status;
  url: string;
}

export interface Game extends GameBase {
  players: string[];
  scores: string[];
}

export interface GameEntity extends GameBase {
  players: User[];
  scores: Score[];
}

export interface CreateGameData extends GameBase {
  players: string[];
  scores: Score[];
}

export interface GameList {
  games: Game[];
}

export interface FetchGameParams {
  id: string;
}

export interface FetchGamesParams {
  playerId: string;
}

export interface FetchGamesResult {
  game: {
    entities: { [key: string]: Game };
    result: string[];
  };
}
