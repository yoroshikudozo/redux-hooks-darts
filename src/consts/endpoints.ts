const API_ROOT = `/api`;
const DARTS = `/darts`;
const ROUNDS = `/rounds`;
const SCORES = `/scores`;
const GAMES = `/games`;
const RULES = `/roles`;
const USERS = `/users`;

const API = {
  ROOT: API_ROOT,
  DARTS,
  ROUNDS,
  SCORES,
  GAMES,
  RULES,
  USERS,
};

export type Endpoints = keyof typeof API;

export default API;
