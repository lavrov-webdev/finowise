import { FormTextInput } from "@components/Form";
import { ArrowRotateLeft, TrashBin } from "@gravity-ui/icons";
import { Button, Flex, Icon } from "@gravity-ui/uikit";
import { TUpdateCategoriesFormFields } from "@modules/Categories/types";
import cn from "classnames";
import { useAtom } from "jotai";
import { FC, useCallback, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { categoriesToDeleteAtom } from "../../store";
import styles from "../../UpdateCategories.module.scss";

type Props = {
  id: number;
  categoryId: number;
};

export const EditableCategory: FC<Props> = ({ categoryId, id }) => {
  const [categoriesToDelete, setCategoriesToDelete] = useAtom(
    categoriesToDeleteAtom,
  );
  const [isEditing, setIsEditing] = useState(false);
  const form = useFormContext<TUpdateCategoriesFormFields>();
  form.watch("editableCategories");

  const addCategoryToDeleteList = useCallback(() => {
    setCategoriesToDelete((p) => new Set(p.add(categoryId)));
  }, [categoryId]);
  const returnCategory = useCallback(() => {
    setCategoriesToDelete((p) => {
      p.delete(categoryId);
      return new Set(p);
    });
  }, [categoryId]);

  const isCategoryToDelte = useMemo(
    () => categoriesToDelete.has(categoryId),
    [categoryId, categoriesToDelete],
  );

  const deleteButton = (
    <Button onClick={addCategoryToDeleteList}>
      <Icon data={TrashBin} />
    </Button>
  );
  const returnButton = (
    <Button onClick={returnCategory}>
      <Icon data={ArrowRotateLeft} />
    </Button>
  );
  return (
    <Flex height={28} gap={2} alignItems="center">
      {isEditing ? (
        <FormTextInput
          autoFocus
          disabled={isCategoryToDelte}
          name={`editableCategories.${id}.name`}
          onBlur={() => {
            setIsEditing(false);
          }}
        />
      ) : (
        <div
          className={cn(styles.editCategoriesEditableCategoryView, {
            [styles.toDelete]: isCategoryToDelte,
          })}
          onFocus={() => (isCategoryToDelte ? undefined : setIsEditing(true))}
          tabIndex={0}
        >
          {form.getValues(`editableCategories.${id}.name`)}
        </div>
      )}
      <div>{isCategoryToDelte ? returnButton : deleteButton}</div>
    </Flex>
  );
};
