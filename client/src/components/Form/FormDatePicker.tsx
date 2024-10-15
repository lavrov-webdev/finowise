import { DatePicker, DatePickerProps } from "@gravity-ui/date-components";
import { dateTime } from "@gravity-ui/date-utils";
import { ArrowShapeLeft, ArrowShapeRight } from "@gravity-ui/icons";
import { Button, Icon } from "@gravity-ui/uikit";
import { DATE_FORMAT } from "@system/consts";
import { FC } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import styles from "./FormDatePicker.module.scss";

type Props = {
  name: string;
  withNextDayButton?: boolean;
  withPrevDayButton?: boolean;
} & DatePickerProps;

export const FormDatePicker: FC<Props> = ({
  name,
  withNextDayButton,
  withPrevDayButton,
  ...rest
}) => {
  const form = useFormContext();
  useWatch({ control: form.control, name });

  const handleNextDayButtonClick = () => {
    const currentValue = dateTime({
      input: form.getValues(name),
      format: DATE_FORMAT,
    });
    form.setValue(name, currentValue.add(1, "day").format(DATE_FORMAT));
  };

  const handlePrevDayButtonClick = () => {
    const currentValue = dateTime({
      input: form.getValues(name),
      format: DATE_FORMAT,
    });
    form.setValue(name, currentValue.add(-1, "day").format(DATE_FORMAT));
  };

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <>
          {withPrevDayButton && (
            <Button
              view="flat"
              className={styles.buttonPrev}
              onClick={handlePrevDayButtonClick}
            >
              <Icon size={12} data={ArrowShapeLeft} />
            </Button>
          )}
          <DatePicker
            {...field}
            {...rest}
            validationState={fieldState.invalid ? "invalid" : undefined}
            errorMessage={fieldState.error?.message}
            onUpdate={(date) => form.setValue(name, date?.format(DATE_FORMAT))}
            value={dateTime({
              input: form.getValues(name),
              format: DATE_FORMAT,
            })}
            format={DATE_FORMAT}
          />
          {withNextDayButton && (
            <Button
              view="flat"
              className={styles.buttonNext}
              onClick={handleNextDayButtonClick}
            >
              <Icon size={12} data={ArrowShapeRight} />
            </Button>
          )}
        </>
      )}
    />
  );
};
