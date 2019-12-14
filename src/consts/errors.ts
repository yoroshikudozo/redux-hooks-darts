const NOT_FOUND = 'データが見つかりませんでした。';
const FORBIDDEN = 'アクセス権がありません。';
const PARSE_ERROR = '不正なJSONです。';
const NETWORK_ERROR = '不正なJSONです。';

const ERRORS = {
  404: NOT_FOUND,
  403: FORBIDDEN,
  PARSE: PARSE_ERROR,
  NETWORK: NETWORK_ERROR,
};

export type Errors = keyof typeof ERRORS;

export default ERRORS;
