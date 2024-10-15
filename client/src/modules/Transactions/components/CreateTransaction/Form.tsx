import { Card } from "@components/Card";
import {
  FormAmountInput,
  FormDatePicker,
  FormProvider,
  FormTextInput,
} from "@components/Form";
import { FormRow } from "@gravity-ui/components";
import { EnvelopeSelector } from "@modules/Envelopes";
import {
  CreateTransactionDto,
  TCreateTransactionDto,
  TCreateTransactionDtoOut,
} from "@modules/Transactions/types";
import { useForm, useWatch } from "react-hook-form";
import styles from "./CreateTransaction.module.scss";
import { Button } from "@gravity-ui/uikit";
import { useCreateTransaction } from "@modules/Transactions/api/hooks/useCreateTransaction";
import { useAddSuccessToaster, useErrorNotifier } from "@system/hooks";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@system/consts";

export const Form = () => {
  const form = useForm<TCreateTransactionDto, null, TCreateTransactionDtoOut>({
    resolver: zodResolver(CreateTransactionDto),
    defaultValues: {
      date: dayjs().format(DATE_FORMAT),
    },
  });
  const createTransactionMutation = useCreateTransaction();
  useWatch({ control: form.control, name: "date" });
  useErrorNotifier(
    createTransactionMutation.error as AxiosError,
    "Ошибка создания транзакции",
  );
  const addToaster = useAddSuccessToaster();

  const submitHandler = async (data: TCreateTransactionDtoOut) => {
    try {
      await createTransactionMutation.mutateAsync(data);
      form.resetField("amount");
      form.setValue("comment", "");
      form.resetField("envelopeId");
      form.setFocus("amount");
      addToaster("Добавлена новая транзакция");
    } catch {}
  };

  return (
    <Card title="Новая транзакция">
      <form className={styles.form} onSubmit={form.handleSubmit(submitHandler)}>
        <FormProvider {...form}>
          <FormRow label="Сумма" required>
            <FormAmountInput name="amount" />
          </FormRow>
          <FormRow label="Дата" required>
            <FormDatePicker name="date" withNextDayButton />
          </FormRow>
          <FormRow label="Конверт" required>
            <EnvelopeSelector date={form.getValues("date")} />
          </FormRow>
          <FormRow label="Комментарий">
            <FormTextInput name="comment" />
          </FormRow>
          <Button
            loading={createTransactionMutation.isPending}
            type="submit"
            view="action"
          >
            Создать
          </Button>
        </FormProvider>
      </form>
    </Card>
  );
};
