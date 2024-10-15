import {
  TCreateCategoryDto,
  TEditCategoryDto,
} from "@modules/Categories/types";
import { createCategories } from "./createCategories";
import { editCategories } from "./editCategories";
import { deleteCategory } from "./deleteCategory";

export const updateCategories = async ({
  newCategories,
  editableCategories,
  categoriesToDelete,
}: {
  newCategories: TCreateCategoryDto[];
  editableCategories: TEditCategoryDto[];
  categoriesToDelete: Set<number>;
}) => {
  return Promise.all([
    createCategories(newCategories),
    editCategories(editableCategories),
    ...Array.from(categoriesToDelete).map((id) => deleteCategory(id)),
  ]);
};
