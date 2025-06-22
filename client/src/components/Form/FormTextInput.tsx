import { TextInput, TextInputProps, PasswordInput } from "@gravity-ui/uikit";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
} & TextInputProps;

export const FormTextInput: FC<Props> = ({ name, ...rest }) => {
  const form = useFormContext();
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        return rest.type === "password" ? (
          <PasswordInput
            {...rest}
            validationState={fieldState.invalid ? "invalid" : undefined}
            hideRevealButton={false}
            onUpdate={(e) => field.onChange(e)}
            value={field.value}
            errorMessage={fieldState.error?.message}
          />
        ) : (
          <TextInput
            {...field}
            {...rest}
            error={!!fieldState.error}
            errorMessage={fieldState.error?.message}
          />
        );
      }}
    />
  );
};
