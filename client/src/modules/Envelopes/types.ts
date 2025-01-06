import { z } from "zod";

export const CreateEnvelopeDto = z.object({
  categoryId: z.number().min(0),
  amount: z.coerce
    .number({
      invalid_type_error: "Введите число",
      required_error: "Введите сумму",
    })
    .min(0, "Сумма не может быть меньше 0"),
});
export type TCreateEnvelopeDto = z.infer<typeof CreateEnvelopeDto>;

export const EditEnvelopeDto = CreateEnvelopeDto.pick({
  amount: true,
}).extend({
  id: z.number().min(0),
});
export type TEditEnvelopeDtoOut = z.output<typeof EditEnvelopeDto>;
export type TEditEnvelopeDtoInput = z.input<typeof EditEnvelopeDto>;
