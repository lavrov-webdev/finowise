import { GetCategoriesDto, TEditCategoryDto } from "@modules/Categories/types";
import { appAxios } from "@system/axios";

export const editCategories = async (editCategoriesDto: TEditCategoryDto[]) => {
  const { data } = await appAxios.patch("/categories", editCategoriesDto);
  return GetCategoriesDto.parse(data);
};
