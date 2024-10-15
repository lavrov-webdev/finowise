import { appAxios } from "@system/axios";
import { GetCategoriesDto } from "../../types";

export const getCategories = async () => {
  const { data } = await appAxios.get("/categories");
  return GetCategoriesDto.parse(data);
};
