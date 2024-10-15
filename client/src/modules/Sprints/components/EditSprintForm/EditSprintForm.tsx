import {
  FormAmountInput,
  FormDatePicker,
  FormProvider,
} from "@components/Form";
import { ModalFooter } from "@components/ModalFooter";
import { FormRow } from "@gravity-ui/components";
import { Button } from "@gravity-ui/uikit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditSprintMutation } from "@modules/Sprints/api/mutations/useEditSprintMutation";
import {
  EditSprintDto,
  TEditSprintDtoInput,
  TEditSprintDtoOutput,
  TGetSprintDto,
} from "@modules/Sprints/types";
import { DATE_FORMAT } from "@system/consts";
import { useAddSuccessToaster, useModal } from "@system/hooks";
import dayjs from "dayjs";
import { FC } from "react";
import { useForm } from "react-hook-form";

type ModalProps = ReturnType<typeof useModal>;

type Props = {
  sprint: TGetSprintDto;
  modalProps?: ModalProps;
};

export const EditSprintForm: FC<Props> = ({ sprint, modalProps }) => {
  const editSprintMutation = useEditSprintMutation();
  const addSuccessToaster = useAddSuccessToaster();
  const form = useForm<TEditSprintDtoInput, any, TEditSprintDtoOutput>({
    resolver: zodResolver(EditSprintDto),
    defaultValues: {
      ...sprint,
      startDate: dayjs(sprint.startDate).format(DATE_FORMAT),
      endDate: dayjs(sprint.endDate).format(DATE_FORMAT),
    },
  });
  const onSubmit = async (data: TEditSprintDtoOutput) => {
    await editSprintMutation.mutateAsync({
      editSprintDto: data,
      id: sprint.id,
    });
    addSuccessToaster("Спринт был отредактирован");
    modalProps?.closeModal();
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <FormRow label="Стартовая сумма">
          <FormAmountInput name="startSum" />
        </FormRow>
        <FormRow label="Дата начала">
          <FormDatePicker name="startDate" />
        </FormRow>
        <FormRow label="Дата конца">
          <FormDatePicker name="endDate" />
        </FormRow>
        {modalProps ? (
          <ModalFooter>
            <Button onClick={modalProps.closeModal}>Отмена</Button>
            <Button
              loading={editSprintMutation.isPending}
              type="submit"
              view="action"
            >
              Редактировать
            </Button>
          </ModalFooter>
        ) : (
          <Button
            loading={editSprintMutation.isPending}
            type="submit"
            view="action"
          >
            Редактировать
          </Button>
        )}
      </FormProvider>
    </form>
  );
};
