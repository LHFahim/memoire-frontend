"use client";

import { loginAction } from "@/actions/auth-actions";
import LoginForm from "@/components/login-form/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ILoginState } from "@/interfaces/auth.interface";
import { useActionState } from "react";

const initial: ILoginState = {
  ok: false,
  message: "",
  errors: {},
};

export default function LoginPage() {
  const [state, action] = useActionState<ILoginState, FormData>(
    loginAction,
    initial
  );

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          {state?.errors && (
            <p className="mt-2 text-sm text-red-600">{state.errors.email}</p>
          )}
        </CardHeader>
        <CardContent>
          <LoginForm action={action} />
        </CardContent>
      </Card>
    </div>
  );
}
