const API_ROOT = `/api`;
const DARTS = `${API_ROOT}/darts`;
const ROUNDS = `${API_ROOT}/rounds`;
const SCORES = `${API_ROOT}/scores`;

const API = {
  DARTS,
  ROUNDS,
  SCORES,
};

export type Endpoints = keyof typeof API;

export default API;
