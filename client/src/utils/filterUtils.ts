export const isNoUndefined = <T>(value: T): value is Exclude<T, undefined> =>
  typeof value !== "undefined";
