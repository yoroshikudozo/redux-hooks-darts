import { normalize, NormalizedSchema, schema } from 'normalizr';

import { User, UserList } from 'modules/users/types';

export type NormalizedUsers = NormalizedSchema<
  { users: { [key: string]: User } },
  { users: string[] }
>;

export const userSchema = new schema.Entity('users');
export const userListSchema = [userSchema];

export const playerSchema = new schema.Entity('players');
export const playerListSchema = [playerSchema];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUserList(data: any): data is UserList {
  return data.users;
}

export const usersNormalize = (data: User | UserList): NormalizedUsers =>
  isUserList(data)
    ? normalize(data, { users: userListSchema })
    : normalize({ users: [data] }, { users: userListSchema });
