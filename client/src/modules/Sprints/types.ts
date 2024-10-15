import { z } from "zod";

import {
  CreateEnvelopeDto,
  GetEnvelopeDto,
  GetEnvelopeWithTransactionsDto,
} from "@modules/Envelopes";

export const CreateSprintDto = z.object({
  startDate: z
    .string({ required_error: "Введите дату начала" })
    .transform((v) => new Date(v)),
  endDate: z
    .string({ required_error: "Введите дату окончания" })
    .transform((v) => new Date(v)),
  startSum: z.coerce.number({ required_error: "Введите начальную сумму" }),
  envelopes: z.array(CreateEnvelopeDto),
});
export type TCreateSprintDtoFields = z.input<typeof CreateSprintDto>;
export type TCreateSprintDto = z.output<typeof CreateEnvelopeDto>;

export const SprintDates = CreateSprintDto.omit({
  envelopes: true,
});
export type TSprintDates = z.infer<typeof SprintDates>;

export const GetSprintDto = CreateSprintDto.extend({
  id: z.number().min(0),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
}).omit({ envelopes: true });
export type TGetSprintDto = z.infer<typeof GetSprintDto>;

export const EditSprintDto = CreateSprintDto.omit({
  envelopes: true,
});
export type TEditSprintDtoInput = z.input<typeof EditSprintDto>;
export type TEditSprintDtoOutput = z.output<typeof EditSprintDto>;

export const GetSprintWithTotalSpendingsAndPlainDto = GetSprintDto.extend({
  totalSpendings: z.number(),
  totalPlain: z.number(),
});
export type TGetSprintWithTotalSpendingsAndPlainDto = z.infer<
  typeof GetSprintWithTotalSpendingsAndPlainDto
>;

export const GetSprintWithEnvelopesDto = GetSprintDto.extend({
  envelopes: z.array(GetEnvelopeDto),
});
export type TGetSprintWithEnvelopesDto = z.infer<
  typeof GetSprintWithEnvelopesDto
>;

export const SprintResponse__Envelopes_Transactions_CurrentBalanceDto =
  GetSprintDto.extend({
    envelopes: z.array(GetEnvelopeWithTransactionsDto),
    currentBalance: z.number(),
  });
export type TGetSprintWithEnvelopesAndTransactionsDto = z.infer<
  typeof SprintResponse__Envelopes_Transactions_CurrentBalanceDto
>;
