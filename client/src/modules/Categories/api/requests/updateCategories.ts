import {
  categoriesControllerCreate,
  categoriesControllerRemove,
  categoriesControllerUpdate,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@generated";

export const updateCategories = async ({
  newCategories,
  editableCategories,
  categoriesToDelete,
}: {
  newCategories: CreateCategoryDto[];
  editableCategories: UpdateCategoryDto[];
  categoriesToDelete: Set<number>;
}) => {
  return Promise.all([
    categoriesControllerCreate({ body: { categories: newCategories } }),
    categoriesControllerUpdate({ body: { categories: editableCategories } }),
    ...Array.from(categoriesToDelete).map((id) => categoriesControllerRemove({ path: { id: id.toString() } })),
  ]);
};
