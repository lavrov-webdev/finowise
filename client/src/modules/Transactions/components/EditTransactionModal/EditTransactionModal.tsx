import { Card } from "@components/Card";
import {
  FormAmountInput,
  FormDatePicker,
  FormProvider,
  FormTextInput,
} from "@components/Form";
import { ModalFooter } from "@components/ModalFooter";
import { FormRow } from "@gravity-ui/components";
import { Button, Modal } from "@gravity-ui/uikit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditTransaction } from "@modules/Transactions/api/hooks/useEditTransaction";
import {
  EditTransactionDto,
  TEditTransactionDto,
  TEditTransactionDtoOut,
  TGetTransactionDto,
} from "@modules/Transactions/types";
import { DATE_FORMAT } from "@system/consts";
import dayjs from "dayjs";
import { FC } from "react";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  transaction: TGetTransactionDto;
  onClose: () => void;
};

export const EditTransactionModal: FC<Props> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  const form = useForm<TEditTransactionDto, any, TEditTransactionDtoOut>({
    resolver: zodResolver(EditTransactionDto),
    defaultValues: {
      ...transaction,
      date: dayjs(transaction.date).format(DATE_FORMAT),
    },
  });
  const editTransactionMutation = useEditTransaction(onClose);
  const onSubmit = (data: TEditTransactionDtoOut) => {
    editTransactionMutation.mutate({
      editTransaction: data,
      id: transaction.id,
    });
  };
  return (
    <Modal onClose={onClose} open={isOpen}>
      <Card title="Редактировать транзакцию">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormProvider {...form}>
            <FormRow label="Сумма" required>
              <FormAmountInput name="amount" />
            </FormRow>
            <FormRow label="Дата" required>
              <FormDatePicker name="date" />
            </FormRow>
            <FormRow label="Комментарий">
              <FormTextInput name="comment" />
            </FormRow>
            <ModalFooter>
              <Button onClick={onClose}>Отмена</Button>
              <Button
                loading={editTransactionMutation.isPending}
                type="submit"
                view="action"
              >
                Редактировать
              </Button>
            </ModalFooter>
          </FormProvider>
        </form>
      </Card>
    </Modal>
  );
};
