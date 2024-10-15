import { FormAmountInput } from "@components/Form";
import { FormRow } from "@gravity-ui/components";

export const StartSum = () => {
  return (
    <FormRow required label="Начальная сумма">
      <FormAmountInput name="startSum" />
    </FormRow>
  );
};
