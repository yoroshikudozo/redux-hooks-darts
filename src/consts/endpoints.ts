const API_ROOT = `/api`;
const DARTS = `${API_ROOT}/darts`;
const ROUNDS = `${API_ROOT}/rounds`;
const SCORES = `${API_ROOT}/scores`;
const GAMES = `${API_ROOT}/games`;
const RULES = `${API_ROOT}/roles`;
const USERS = `${API_ROOT}/users`;

const API = {
  DARTS,
  ROUNDS,
  SCORES,
  GAMES,
  RULES,
  USERS,
};

export type Endpoints = keyof typeof API;

export default API;
