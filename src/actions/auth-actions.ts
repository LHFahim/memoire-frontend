"use server";

import { ILoginResponse, ILoginState } from "@/interfaces/auth.interface";

export const loginAction = async (
  prevState: ILoginState,
  formData: FormData
): Promise<ILoginState> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: Record<string, string> = {};

  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "Please fix errors and try again.",
      errors,
    };
  }

  const res = await fetch("http://localhost:5000/auth/login/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data: ILoginResponse = await res.json();
  console.log("🚀 ~ loginAction ~ data:", data);

  // redirect("/dashboard");

  return {
    ok: true,
    message: "Signed in successfully.",
    errors: {},
  };
};
