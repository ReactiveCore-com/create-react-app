export const getLabel = (val) => {
  return val.replace(/_/g, ' ');
};

export const trimToLength = (str: string, n: number = 50) => {
  let _str = str;
  if (!!_str && _str.length > n) {
      _str = _str.substr(0, n) + '...';
  }
  return _str;
}