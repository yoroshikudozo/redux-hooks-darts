const HOME = `/`;
const LOGIN = '/login';
const USERS = '/users';
const USERS_CREATE = `${USERS}/create`;
const USERS_DETAIL = `${USERS}/detail`;
const GAMES = '/games';
const COUNT_UP = `${GAMES}/count-up`;

const ROUTES = {
  HOME,
  LOGIN,
  USERS: {
    ROOT: USERS,
    CREATE: USERS_CREATE,
    DETAIL: USERS_DETAIL,
  },
  GAMES: {
    ROOT: GAMES,
    COUNT_UP,
  },
};

export default ROUTES;
