import { schema, normalize } from 'normalizr';
import { User, FetchUsersResponse } from 'modules/users/types';
import { NormalizedEntities } from 'modules/common/schemas';

export const userSchema = new schema.Entity('users');
export const userListSchema = [userSchema];

export const playerSchema = new schema.Entity('players');
export const playerListSchema = [playerSchema];

export type NormalizedUsers = NormalizedEntities<User>;

export const userNormalize = (user: User): NormalizedUsers =>
  normalize({ users: [user] }, { users: userListSchema });

export const usersNormalize = (data: FetchUsersResponse): NormalizedUsers =>
  normalize(data, { users: userListSchema });
