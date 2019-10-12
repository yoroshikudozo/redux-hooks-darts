import { schema, NormalizedSchema, normalize } from 'normalizr';
import { User, FetchUsersResponse } from 'modules/users/types';

export const userSchema = new schema.Entity('users');
export const userListSchema = [userSchema];

export type NormalizedEntity<T> = NormalizedSchema<
  { [key: string]: T },
  string
>;

export type NormalizedEntities<T> = NormalizedSchema<
  { [key: string]: T },
  string[]
>;

export type NormalizedUser = NormalizedEntity<User>;
export type NormalizedUsers = NormalizedEntities<User>;

export const userNormalize = (data: User): NormalizedEntity<User> =>
  normalize(data, userSchema);

export const usersNormalize = (
  data: FetchUsersResponse,
): NormalizedEntities<User> => normalize(data.users, userListSchema);
