import { schema, NormalizedSchema, normalize } from 'normalizr';
import { Game, FetchGamesResponse } from 'modules/games/types';
import { playerListSchema } from 'modules/users/schema';

export const gameSchema = new schema.Entity('games', {
  players: playerListSchema,
});

export const gameListSchema = new schema.Array(gameSchema);

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

export const gameNormalize = (data: Game): NormalizedGame =>
  normalize(data, gameSchema);

export const gamesNormalize = (data: FetchGamesResponse): NormalizedGames =>
  normalize(data.games, gameListSchema);
