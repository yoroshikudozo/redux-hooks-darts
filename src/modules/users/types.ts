type Flight = 0 | 1 | 2 | 3 | 4;

export interface User {
  id: string;
  name: string;
  nickname: string;
  flight: Flight;
}

export interface FetchUsersResponse {
  users: User[];
}
