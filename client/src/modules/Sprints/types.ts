import { z } from "zod";

import {
  CreateEnvelopeDto
} from "@modules/Envelopes";

export const CreateSprintDto = z.object({
  startDate: z.string({ required_error: "Введите дату начала" }),
  endDate: z.string({ required_error: "Введите дату окончания" }),
  startSum: z.coerce.number({ required_error: "Введите начальную сумму" }),
  envelopes: z.array(CreateEnvelopeDto),
});
export type TCreateSprintDtoFields = z.input<typeof CreateSprintDto>;
export type TCreateSprintDto = z.output<typeof CreateSprintDto>;

export const SprintDates = CreateSprintDto.omit({
  envelopes: true,
});
export type TSprintDates = z.infer<typeof SprintDates>;

export const EditSprintDto = CreateSprintDto.omit({
  envelopes: true,
});
export type TEditSprintDtoInput = z.input<typeof EditSprintDto>;
export type TEditSprintDtoOutput = z.output<typeof EditSprintDto>;
