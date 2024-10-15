type KeyFunc<T> = (item: T) => string | number;

export function groupBy<T>(
  arr: T[],
  keyFuncOrKey: KeyFunc<T> | keyof T,
): Record<string, T[]> {
  return arr.reduce(
    (result, item) => {
      const key =
        typeof keyFuncOrKey === "function"
          ? keyFuncOrKey(item)
          : item[keyFuncOrKey];
      const keyStr = String(key);
      if (!result[keyStr]) {
        result[keyStr] = [];
      }
      result[keyStr].push(item);
      return result;
    },
    {} as Record<string, T[]>,
  );
}
