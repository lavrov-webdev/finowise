import { Card } from "@components/Card";
import { FormProvider } from "@components/Form";
import { Button } from "@gravity-ui/uikit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategories } from "@modules/Categories";
import { TCreateEnvelopeDto } from "@modules/Envelopes";
import { useCreateSprint } from "@modules/Sprints/api/mutations/useCreateSprint";
import {
  CreateSprintDto,
  TCreateSprintDto,
  TCreateSprintDtoFields,
} from "@modules/Sprints/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./CreateSprint.module.scss";
import { Dates } from "./components/Dates";
import { Envelopes } from "./components/Envelopes";
import { Preview } from "./components/Preview";
import { StartSum } from "./components/StartSum";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@system/consts";

export const Form = () => {
  const form = useForm<TCreateSprintDtoFields, any, TCreateSprintDto>({
    resolver: zodResolver(CreateSprintDto),
    defaultValues: {
      envelopes: [],
      startSum: 0,
      startDate: dayjs().format(DATE_FORMAT),
      endDate: dayjs().add(14, "day").format(DATE_FORMAT),
    },
  });
  const categoriesState = useGetCategories();
  const createSprintMutate = useCreateSprint();
  useEffect(() => {
    form.setValue(
      "envelopes",
      categoriesState.data?.reduce<TCreateEnvelopeDto[]>((prev, category) => {
        if (category.isActive) {
          prev.push({
            amount: 0,
            categoryId: category.id,
          });
        }
        return prev;
      }, []) || [],
    );
  }, [categoriesState.data]);
  const onSubmit = (data: TCreateSprintDto) => {
    createSprintMutate.mutate(data);
  };
  return (
    <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <Card title="Начать новый спринт">
          <Dates />
          <StartSum />
          <Envelopes />
          <Button
            loading={createSprintMutate.isPending}
            type="submit"
            view="action"
          >
            Создать
          </Button>
        </Card>
        <Preview />
      </FormProvider>
    </form>
  );
};
