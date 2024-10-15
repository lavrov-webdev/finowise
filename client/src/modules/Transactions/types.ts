import { z } from "zod";

import { GetCategoryDto } from "@modules/Categories";

const BaseTransaction = z.object({
  amount: z
    .number({
      invalid_type_error: "Введите сумму",
      required_error: "Введите сумму",
    })
    .min(0, "Сумма не может быть меньше 0 ₽"),
  date: z
    .string()
    .date()
    .transform((v) => new Date(v)),
  comment: z
    .string()
    .optional()
    .or(z.null())
    .transform((v) => (typeof v === "string" ? v : undefined)),
});

export const CreateTransactionDto = BaseTransaction.extend({
  envelopeId: z.number({ required_error: "Выберите конверт" }).min(0),
});
export type TCreateTransactionDto = z.input<typeof CreateTransactionDto>;
export type TCreateTransactionDtoOut = z.output<typeof CreateTransactionDto>;

export const GetTransactionDto = CreateTransactionDto.extend({
  id: z.number().min(0),
  date: z
    .string()
    .datetime()
    .transform((v) => new Date(v)),
  createdAt: z
    .string()
    .datetime()
    .transform((v) => new Date(v)),
  updatedAt: z
    .string()
    .datetime()
    .transform((v) => new Date(v)),
  sprintId: z.number().min(0),
  categoryId: z.number().min(0),
  userId: z.number().min(0),
});
export type TGetTransactionDto = z.infer<typeof GetTransactionDto>;

export const GetTransactionsWithCategoryName = GetTransactionDto.extend({
  category: GetCategoryDto.pick({ name: true }),
});
export type TGetTransactionsWithCategoryName = z.infer<
  typeof GetTransactionsWithCategoryName
>;

export const TransactionTableRow = BaseTransaction.extend({
  categoryName: z.string(),
});
export type TTransactionTableRow = z.infer<typeof TransactionTableRow>;

export const EditTransactionDto = CreateTransactionDto.omit({
  envelopeId: true,
});
export type TEditTransactionDto = z.input<typeof EditTransactionDto>;
export type TEditTransactionDtoOut = z.output<typeof EditTransactionDto>;
