import { z } from "zod";

export const CreateCategoryDto = z.object({
  name: z.string().max(100).nonempty("Введите название категории"),
});
export type TCreateCategoryDto = z.infer<typeof CreateCategoryDto>;

export const EditCategoryDto = CreateCategoryDto.extend({
  id: z.number().min(0),
});
export type TEditCategoryDto = z.infer<typeof EditCategoryDto>;

export const UpdateCategoriesFormFields = z.object({
  newCategories: CreateCategoryDto.array(),
  editableCategories: EditCategoryDto.array(),
});
export type TUpdateCategoriesFormFields = z.infer<
  typeof UpdateCategoriesFormFields
>;
