import { schema, normalize } from 'normalizr';
import { User, FetchUsersResponse } from 'modules/users/types';
import { NormalizedEntity, NormalizedEntities } from 'modules/common/schemas';

export const userSchema = new schema.Entity('users');
export const userListSchema = [userSchema];

export const playerSchema = new schema.Entity('players');
export const playerListSchema = [playerSchema];

export type NormalizedUser = NormalizedEntity<User>;
export type NormalizedUsers = NormalizedEntities<User>;

export const userNormalize = (data: User): NormalizedEntity<User> =>
  normalize(data, { users: userSchema });

export const usersNormalize = (
  data: FetchUsersResponse,
): NormalizedEntities<User> => normalize(data, { users: userListSchema });
