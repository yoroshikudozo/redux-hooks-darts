import { schema, normalize } from 'normalizr';
import { User, UserList } from 'modules/users/types';
import { NormalizedEntities } from 'modules/common/schemas';

export const userSchema = new schema.Entity('users');
export const userListSchema = [userSchema];

export const playerSchema = new schema.Entity('players');
export const playerListSchema = [playerSchema];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isUserList(data: any): data is UserList {
  return data.users;
}

export const usersNormalize = <R>(
  data: User | UserList,
): NormalizedEntities<User, R> => {
  console.log(data);
  return isUserList(data)
    ? normalize(data, { users: userListSchema })
    : normalize({ users: [data] }, { users: userListSchema });
};
