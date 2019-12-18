import { schema, normalize } from 'normalizr';

import { Game, FetchGamesResponse } from 'modules/games/types';
import { playerListSchema } from 'modules/users/schemas';
import { NormalizedEntities } from 'modules/common/schemas';

export const gameSchema = new schema.Entity('games', {
  players: playerListSchema,
});

export const gameListSchema = new schema.Array(gameSchema);

export const gameNormalize = (
  game: Game,
): NormalizedEntities<Game, { games: string[] }> =>
  normalize({ games: [game] }, { games: gameListSchema });

export const gamesNormalize = (
  data: FetchGamesResponse,
): NormalizedEntities<Game, { games: string[] }> =>
  normalize(data, { games: gameListSchema });
