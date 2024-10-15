import { Flex, Text } from "@gravity-ui/uikit";
import { useGetCategories } from "@modules/Categories/api/hooks/useGetCategories";
import { TUpdateCategoriesFormFields } from "@modules/Categories/types";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import styles from "../../UpdateCategories.module.scss";
import { EditCategoriesSkeleton } from "./EditCategoriesSkeleton";
import { EditableCategory } from "./EditableCategory";

export const EditCategories = () => {
  const { isLoading } = useGetCategories();
  const form = useFormContext<TUpdateCategoriesFormFields>();
  const editableCategoriesArray = useFieldArray({
    control: form.control,
    name: "editableCategories",
    keyName: "rhfId",
  });
  useWatch({ control: form.control, name: "editableCategories" });

  return (
    <div className={styles.cardContent}>
      <Text className={styles.subtitle} variant="subheader-3">
        Редактировать существующие
      </Text>
      {isLoading && <EditCategoriesSkeleton />}
      {editableCategoriesArray.fields.length === 0 ? (
        "Пока у вас нет категорий"
      ) : (
        <Flex direction="column" gap={3}>
          {editableCategoriesArray.fields.map((category, id) => (
            <EditableCategory
              key={category.id}
              categoryId={category.id}
              id={id}
            />
          ))}
        </Flex>
      )}
    </div>
  );
};
