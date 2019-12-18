import { schema, normalize } from 'normalizr';
import { User, FetchUsersResponse } from 'modules/users/types';
import { NormalizedEntities } from 'modules/common/schemas';

export const userSchema = new schema.Entity('users');
export const userListSchema = [userSchema];

export const playerSchema = new schema.Entity('players');
export const playerListSchema = [playerSchema];

export const userNormalize = (
  user: User,
): NormalizedEntities<User, { users: string[] }> =>
  normalize({ users: [user] }, { users: userListSchema });

export const usersNormalize = (
  data: FetchUsersResponse,
): NormalizedEntities<User, { users: string[] }> =>
  normalize(data, { users: userListSchema });
