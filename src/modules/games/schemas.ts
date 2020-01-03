import { normalize, schema } from 'normalizr';

import { NormalizedEntities } from 'modules/common/schemas';
import { Game, GameList } from 'modules/games/types';
import { playerListSchema } from 'modules/users/schemas';

export const gameSchema = new schema.Entity('games', {
  players: playerListSchema,
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
