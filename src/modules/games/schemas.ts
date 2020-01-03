import { normalize, schema } from 'normalizr';

import { NormalizedEntities } from 'modules/common/schemas';
import { CreateGameData, Game, GameList } from 'modules/games/types';
import { scoreListSchema } from 'modules/scores/schemas';
import { playerListSchema } from 'modules/users/schemas';

export const gameSchema = new schema.Entity('games', {
  players: playerListSchema,
  scores: scoreListSchema,
});

const createGameDataSchema = new schema.Entity('games', {
  scores: scoreListSchema,
});

export const gameListSchema = new schema.Array(gameSchema);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGamesList(data: any): data is GameList {
  return data.games;
}

export const gamesNormalize = <R>(
  data: Game | GameList,
): NormalizedEntities<Game, R> =>
  isGamesList(data)
    ? normalize(data, { games: gameListSchema })
    : normalize({ games: [data] }, { games: gameListSchema });

export const createGameDataNormalize = <R>(
  data: CreateGameData,
): NormalizedEntities<Game, R> =>
  normalize({ games: [data] }, { games: [createGameDataSchema] });
