import { SelectOption } from "@gravity-ui/uikit";
import { TGetEnvelopesWithCategoryNameAndSprintDates } from "@modules/Envelopes";
import { useMemo } from "react";

export const useEnvelopesOptions = (
  envelopes: TGetEnvelopesWithCategoryNameAndSprintDates[],
): SelectOption[] => {
  return useMemo(
    () =>
      envelopes.reduce<SelectOption[]>((acc, envelope) => {
        acc.push({
          value: envelope.id.toString(),
          text: envelope.category.name,
          content: envelope.category.name,
        });
        return acc;
      }, []),
    [envelopes],
  );
};
