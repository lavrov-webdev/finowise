import { z } from "zod";

export const AuthDto = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z
    .string()
    .min(6, "Минимум 6 символов")
    .max(20, "Не больше 20 символов"),
});
export type TAuthDto = z.infer<typeof AuthDto>;

export enum TAuthFormType {
  signIn = "signIn",
  signUp = "signUp",
}
