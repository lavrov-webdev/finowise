import { clearNumberString } from "./clearNumberString";

export const separateThousand = (value: string | number) => {
  if (value === undefined) return "";
  value = typeof value === "string" ? clearNumberString(value) : value;
  return new Intl.NumberFormat("ru-RU").format(Number(value));
};
