import { normalize, schema } from 'normalizr';

import { NormalizedEntities } from 'modules/common/schemas';
import { FetchGamesResponse, Game } from 'modules/games/types';
import { playerListSchema } from 'modules/users/schemas';

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
