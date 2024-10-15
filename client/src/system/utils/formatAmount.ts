import { separateThousand } from "./separateThousand";

export const formatAmount = (value: number | string, symbol = "₽") => {
  const separatedThousand = separateThousand(value);
  return separatedThousand + `\u00A0${symbol}`;
};
