const HOME = `/`;
const LOGIN = '/login';
const USERS = '/users';
const USERS_CREATE = `${USERS}/create`;
const GAMES = '/games';
const COUNT_UP = `${GAMES}/countup`;

const ROUTES = {
  HOME,
  LOGIN,
  USERS: {
    ROOT: USERS,
    CREATE: USERS_CREATE,
  },
  GAMES: {
    ROOT: GAMES,
    COUNT_UP,
  },
};

export default ROUTES;
