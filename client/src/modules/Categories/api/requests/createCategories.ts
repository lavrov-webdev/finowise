import {
  GetCategoriesDto,
  TCreateCategoryDto,
  TGetCategoryDto,
} from "@modules/Categories/types";
import { appAxios } from "@system/axios";

export const createCategories = async (
  createCategoriesDto: TCreateCategoryDto[],
) => {
  const { data } = await appAxios.post<TGetCategoryDto[]>(
    "/categories",
    createCategoriesDto,
  );
  return GetCategoriesDto.parse(data);
};
