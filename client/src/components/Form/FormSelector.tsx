import { Select, SelectProps } from "@gravity-ui/uikit";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  isNumberValue?: boolean;
} & SelectProps;

export const FormSelector: FC<Props> = ({
  name,
  isNumberValue,
  multiple,
  ...rest
}) => {
  const form = useFormContext();
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          {...rest}
          multiple={multiple}
          value={multiple ? field.value : [field.value?.toString()]}
          errorMessage={fieldState.error?.message}
          onUpdate={(value) =>
            field.onChange(
              multiple ? value : isNumberValue ? Number(value[0]) : value[0],
            )
          }
        />
      )}
    />
  );
};
