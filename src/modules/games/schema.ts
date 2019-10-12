import { schema, NormalizedSchema, normalize } from 'normalizr';
import { Game, FetchGamesResponse } from 'modules/games/types';
import { userListSchema } from 'modules/users/schema';

export const gameSchema = new schema.Entity('games', {
  players: userListSchema,
});
export const gameListSchema = [gameSchema];

export type NormalizedEntity<T> = NormalizedSchema<
  { [key: string]: T },
  string
>;

export type NormalizedEntities<T> = NormalizedSchema<
  { [key: string]: T },
  string[]
>;

export type NormalizedGame = NormalizedEntity<Game>;
export type NormalizedGames = NormalizedEntities<Game>;

export const gameNormalize = (data: Game): NormalizedEntity<Game> =>
  normalize(data, gameSchema);

export const gamesNormalize = (
  data: FetchGamesResponse,
): NormalizedEntities<Game> => normalize(data.games, gameListSchema);
