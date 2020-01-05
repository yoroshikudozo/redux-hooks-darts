import { normalize, NormalizedSchema, schema } from 'normalizr';

import { Dart } from 'modules/darts/types';
import { CreateGameData, Game, GameList } from 'modules/games/types';
import { Round } from 'modules/rounds/types';
import { scoreListSchema } from 'modules/scores/schemas';
import { Score } from 'modules/scores/types';
import { playerListSchema } from 'modules/users/schemas';
import { User } from 'modules/users/types';

export const gameSchema = new schema.Entity('games', {
  players: playerListSchema,
  scores: scoreListSchema,
});

const createGameDataSchema = new schema.Entity('games', {
  scores: scoreListSchema,
});

export const gameListSchema = new schema.Array(gameSchema);

export type NormalizedGames = NormalizedSchema<
  {
    games: { [key: string]: Game };
    players: { [key: string]: User };
    rounds: { [key: string]: Round };
    scores: { [key: string]: Score };
    darts: { [key: string]: Dart };
  },
  { games: string[] }
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGamesList(data: any): data is GameList {
  return data.games;
}

export const gamesNormalize = (data: Game | GameList): NormalizedGames =>
  isGamesList(data)
    ? normalize(data, { games: gameListSchema })
    : normalize({ games: [data] }, { games: gameListSchema });

export const createGameDataNormalize = <R>(
  data: CreateGameData,
): NormalizedGames =>
  normalize({ games: [data] }, { games: [createGameDataSchema] });
