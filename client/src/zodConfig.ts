import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (ctx.defaultError === "Required") {
    return { message: "Обязвтельное поле" };
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    return { message: `Минимум ${issue.minimum} символов` };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
