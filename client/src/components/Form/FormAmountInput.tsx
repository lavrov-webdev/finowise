import { TextInput, TextInputProps } from "@gravity-ui/uikit";
import { clearNumberString } from "@system/utils/clearNumberString";
import { separateThousand } from "@system/utils/separateThousand";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styles from "./FormAmountInput.module.scss";

const nope = () => {};

type Props = {
  name: string;
} & Omit<TextInputProps, "type">;

export const FormAmountInput: FC<Props> = ({ name, ...rest }) => {
  const form = useFormContext();
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <TextInput
            {...field}
            {...rest}
            ref={undefined}
            controlRef={field.ref}
            onChange={nope}
            onUpdate={(value) => {
              field.onChange(Number(clearNumberString(value)));
            }}
            value={separateThousand(field.value)}
            error={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            endContent={<div className={styles.currencyIcon}>₽</div>}
          />
        );
      }}
    />
  );
};
