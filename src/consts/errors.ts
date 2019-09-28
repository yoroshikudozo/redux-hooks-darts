const NOT_FOUND = 'データが見つかりませんでした。';
const UNAUTHORIZED = 'アクセス権がありません。';

const ERRORS = {
  404: NOT_FOUND,
  403: UNAUTHORIZED,
};

export type Errors = keyof typeof ERRORS;

export default ERRORS;
