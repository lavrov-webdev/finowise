import { Plus } from "@gravity-ui/icons";
import { Button, Flex, Icon, Text } from "@gravity-ui/uikit";
import { TUpdateCategoriesFormFields } from "@modules/Categories/types";
import { useCallback } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import styles from "../../UpdateCategories.module.scss";
import { CreateCategory } from "./CreateCategory";

export const CreateCategories = () => {
  const form = useFormContext<TUpdateCategoriesFormFields>();
  const createCategoriesArray = useFieldArray({
    control: form.control,
    name: "newCategories",
  });
  const addNewCategory = useCallback(() => {
    createCategoriesArray.append({ name: "" });
  }, [createCategoriesArray]);
  return (
    <div className={styles.cardContent}>
      <Text className={styles.subtitle} variant="subheader-3">
        Добавить новые
      </Text>
      <Flex direction="column" gap={3}>
        {createCategoriesArray.fields.map((category, id) => (
          <CreateCategory
            key={category.id}
            onDelete={createCategoriesArray.remove}
            id={id}
          />
        ))}
      </Flex>
      <Button
        className={styles.createCategoriesAddButton}
        view="outlined-action"
        onClick={addNewCategory}
        size="l"
      >
        <Icon data={Plus} />
      </Button>
    </div>
  );
};
