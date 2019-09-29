const NOT_FOUND = 'データが見つかりませんでした。';
const UNAUTHORIZED = 'アクセス権がありません。';
const PARSE_ERROR = '不正なJSONです。';

const ERRORS = {
  404: NOT_FOUND,
  403: UNAUTHORIZED,
  PARSE: PARSE_ERROR,
};

export type Errors = keyof typeof ERRORS;

export default ERRORS;
