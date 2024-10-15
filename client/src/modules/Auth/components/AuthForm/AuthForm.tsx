import { FormProvider, FormTextInput } from "@components/Form";
import { FormRow } from "@gravity-ui/components";
import { Button } from "@gravity-ui/uikit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@modules/Auth/api/hooks/useSignIn";
import { useSignUp } from "@modules/Auth/api/hooks/useSignUp";
import { AuthDto, TAuthDto, TAuthFormType } from "@modules/Auth/types";
import { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "./AuthForm.module.scss";

type Props = {
  type: TAuthFormType;
};

export const AuthForm: FC<Props> = ({ type }) => {
  const form = useForm<TAuthDto>({ resolver: zodResolver(AuthDto) });
  const { mutate: signInMutate } = useSignIn();
  const { mutate: signUpMutate } = useSignUp();

  const submitHandler = (data: TAuthDto) => {
    return type === TAuthFormType.signUp
      ? signUpMutate(data)
      : signInMutate(data);
  };
  return (
    <form onSubmit={form.handleSubmit(submitHandler)} className={styles.form}>
      <FormProvider {...form}>
        <FormRow label="email">
          <FormTextInput name="email" placeholder="test@email.ru" />
        </FormRow>
        <FormRow label="password">
          <FormTextInput
            name="password"
            type="password"
            placeholder="password"
          />
        </FormRow>
        <Button width="max" view="action" type="submit">
          {type === TAuthFormType.signIn ? "Войти" : "Зарегестрироваться÷"}
        </Button>
      </FormProvider>
    </form>
  );
};
