import { formatAmount } from "@system/utils/formatAmount";
import { useMemo } from "react";

export const useFormatAmount = (value: number | string) => {
  return useMemo(() => formatAmount(value), [value]);
};
