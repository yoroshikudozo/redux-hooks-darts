const LOGIN = '/login';
const USERS = '/users';
const USERS_CREATE = `${USERS}/create`;

const ROUTES = {
  LOGIN,
  USERS: {
    ROOT: USERS,
    CREATE: USERS_CREATE,
  },
};

export default ROUTES;
