import { TransactionDetailedResponseDto } from "@generated";
import { z } from "zod";

const BaseTransaction = z.object({
  amount: z
    .number({
      invalid_type_error: "Введите сумму",
      required_error: "Введите сумму",
    })
    .min(0, "Сумма не может быть меньше 0 ₽"),
  date: z
    .string()
    .date(),
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

export const TransactionTableRow = BaseTransaction.extend({
  categoryName: z.string(),
});
export type TTransactionTableRow = z.infer<typeof TransactionTableRow>;

export const EditTransactionDto = CreateTransactionDto.omit({
  envelopeId: true,
});
export type TEditTransactionDto = z.input<typeof EditTransactionDto>;
export type TEditTransactionDtoOut = z.output<typeof EditTransactionDto>;


export type TTransactionColumnKey = keyof TransactionDetailedResponseDto | "actions"