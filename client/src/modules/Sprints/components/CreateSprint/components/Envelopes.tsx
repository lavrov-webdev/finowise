import { FormAmountInput } from "@components/Form";
import { FormRow } from "@gravity-ui/components";
import { useGetCategories } from "@modules/Categories";
import { TCreateSprintDtoFields } from "@modules/Sprints/types";
import { useFieldArray, useFormContext } from "react-hook-form";
import { EnvelopesSkeleton } from "./EnvelopesSkeleton";

export const Envelopes = () => {
  const form = useFormContext<TCreateSprintDtoFields>();
  const categoriesState = useGetCategories();
  const envelopesArray = useFieldArray({
    control: form.control,
    name: "envelopes",
    keyName: "rhfId",
  });
  if (categoriesState.isLoading) {
    return <EnvelopesSkeleton />;
  }
  return (
    <div>
      {envelopesArray.fields.map((envelope, idx) => (
        <FormRow
          key={envelope.rhfId}
          label={
            categoriesState.data?.find((c) => c.id === envelope.categoryId)
              ?.name
          }
        >
          <FormAmountInput name={`envelopes.${idx}.amount`} hasClear />
        </FormRow>
      ))}
    </div>
  );
};
