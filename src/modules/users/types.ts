type Flight = 0 | 1 | 2 | 3 | 4;

export interface User {
  id: string;
  name: string;
  nickname: string;
  flight: Flight;
}

export interface FetchUserParams {
  id: string;
}

export interface FetchUsersResponse {
  users: User[];
}

export interface CreateUserData {
  id: string;
  name: string;
  nickname: string;
  flight: 0;
}

export interface CreateUserFormData {
  name: string;
  nickname?: string;
}
