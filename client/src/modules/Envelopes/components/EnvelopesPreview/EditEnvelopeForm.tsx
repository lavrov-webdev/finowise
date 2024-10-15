import { Card } from "@components/Card";
import { TEnvelopeSummary } from "./types";
import { FC } from "react";
import { useEditEnvelope } from "@modules/Envelopes/api/hooks/useEditEnvelope";
import { FormAmountInput, FormProvider } from "@components/Form";
import { ModalFooter } from "@components/ModalFooter";
import { FormRow } from "@gravity-ui/components";
import { Button } from "@gravity-ui/uikit";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TEditEnvelopeDtoInput,
  TEditEnvelopeDtoOut,
  EditEnvelopeDto,
} from "@modules/Envelopes/types";
import { useForm } from "react-hook-form";

type Props = {
  onClose: () => void;
  envelope: TEnvelopeSummary;
};

export const EditEnvelopeForm: FC<Props> = ({ onClose, envelope }) => {
  const editEnvelopeMutation = useEditEnvelope(onClose);

  const form = useForm<TEditEnvelopeDtoInput, any, TEditEnvelopeDtoOut>({
    defaultValues: {
      id: envelope.id,
      amount: envelope.initialPlannedExpense,
    },
    resolver: zodResolver(EditEnvelopeDto),
  });

  const handleSubmit = (data: TEditEnvelopeDtoOut) => {
    editEnvelopeMutation.mutate(data);
  };
  return (
    <Card title="Редактировать конверт">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormProvider {...form}>
          <FormRow label="План">
            <FormAmountInput name="amount" />
          </FormRow>
          <ModalFooter>
            <Button type="button" onClick={onClose}>
              Отмена
            </Button>
            <Button
              loading={editEnvelopeMutation.isPending}
              view="action"
              type="submit"
            >
              Редактировать
            </Button>
          </ModalFooter>
        </FormProvider>
      </form>
    </Card>
  );
};
