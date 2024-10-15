import { DevTool } from "@hookform/devtools";
import {
  FieldValues,
  FormProviderProps,
  FormProvider as RHFFormProvider,
} from "react-hook-form";

type TFormProvider = <
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  props: FormProviderProps<TFieldValues, TContext, TTransformedValues>,
) => React.JSX.Element;

export const FormProvider: TFormProvider = ({ children, ...rest }) => {
  return (
    <RHFFormProvider {...rest}>
      {children}
      {process.env.NODE_ENV === "development" ? (
        <DevTool control={rest.control} />
      ) : null}
    </RHFFormProvider>
  );
};
