import { Card } from "@components/Card";
import { FormProvider } from "@components/Form";
import { Button, Flex } from "@gravity-ui/uikit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategories, useUpdateCategories } from "@modules/Categories";
import {
  TUpdateCategoriesFormFields,
  UpdateCategoriesFormFields,
} from "@modules/Categories/types";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CreateCategories } from "./components/CreateCategories";
import { EditCategories } from "./components/EditCategories";
import { categoriesToDeleteAtom } from "./store";

export const UpdateCategories = () => {
  const form = useForm<TUpdateCategoriesFormFields>({
    resolver: zodResolver(UpdateCategoriesFormFields),
  });
  const [categoriesToDelete, setCategoriesToDelete] = useAtom(
    categoriesToDeleteAtom,
  );
  const loadedCategories = useGetCategories();
  const { mutate, isPending } = useUpdateCategories(() => {
    setCategoriesToDelete(new Set());
    form.setValue("newCategories", []);
  });
  useEffect(() => {
    if (!loadedCategories.data) {
      return;
    }
    form.setValue(
      "editableCategories",
      loadedCategories.data.data?.filter((c) => c.isActive) || [],
    );
  }, [loadedCategories.data]);
  const onSubmit = (data: TUpdateCategoriesFormFields) => {
    const editableCategories = data.editableCategories.filter(
      (category) => !categoriesToDelete.has(category.id),
    );
    mutate({
      categoriesToDelete,
      editableCategories,
      newCategories: data.newCategories,
    });
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        <Card title="Обновить категории">
          <Flex
            direction="column"
            gap={4}
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <EditCategories />
            <CreateCategories />
            <Button loading={isPending} view="action" type="submit">
              Обновить
            </Button>
          </Flex>
        </Card>
      </FormProvider>
    </form>
  );
};
