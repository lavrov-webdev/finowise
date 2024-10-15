import { FormDatePicker } from "@components/Form/FormDatePicker";
import { FormRow } from "@gravity-ui/components";
import { dateTime } from "@gravity-ui/date-utils";
import {
  TCreateSprintDto,
  TCreateSprintDtoFields,
} from "@modules/Sprints/types";
import { useFormContext, useWatch } from "react-hook-form";
import styles from "../CreateSprint.module.scss";

export const Dates = () => {
  const form = useFormContext<TCreateSprintDtoFields, any, TCreateSprintDto>();
  useWatch({ control: form.control, name: "startDate" });
  return (
    <div className={styles.dates}>
      <FormRow direction="column" label="Начальная дата">
        <FormDatePicker name="startDate" />
      </FormRow>
      <FormRow direction="column" label="Конечная дата">
        <FormDatePicker
          minValue={dateTime({ input: form.getValues("startDate") })}
          name="endDate"
        />
      </FormRow>
    </div>
  );
};
