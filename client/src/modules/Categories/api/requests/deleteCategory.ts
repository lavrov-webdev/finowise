import { GetCategoryDto } from "@modules/Categories/types";
import { appAxios } from "@system/axios";

export const deleteCategory = async (id: number) => {
  const { data } = await appAxios.delete(`/categories/${id}`);
  return GetCategoryDto.parse(data);
};
