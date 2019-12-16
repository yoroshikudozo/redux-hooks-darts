export function getQueryString(params: any = {}) {
  return (
    '?' +
    Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&')
  );
}

export default getQueryString;
