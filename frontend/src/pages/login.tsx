import { Button } from "@/components/ui/button";
import { Field, FieldControl, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox, CheckboxIndicator } from "@/components/ui/checkbox";
import { useSignUpMutation } from "@/lib/mutations/auth.mutation";
import { useState } from "react";
import { EyeIcon, EyeClosedIcon } from "@solar-icons/react/linear";

const Login = () => {
  const [viewPass, setViewPass] = useState(false);
  const { mutate: signIn, isPending, error } = useSignUpMutation();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    signIn({
      password: formData.get("password") as string,
      email: formData.get("email") as string,
      rememberMe: formData.get("remember_me") !== null,
    });
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-sm mx-auto w-full">
        <header className="px-2 mb-7">
          <h1 className="text-xl font-semibold text-center tracking-tight text-foreground">
            Log in to your account
          </h1>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Field>
              <FieldLabel>Email</FieldLabel>
              <FieldControl
                name="email"
                required
                placeholder="example@gmail.com"
                render={<Input />}
              />
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <FieldControl
                type={viewPass ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                render={
                  <Input
                    rightSection={
                      <button
                        type="button"
                        onClick={() => setViewPass(!viewPass)}
                      >
                        {viewPass ? (
                          <EyeClosedIcon size={20} />
                        ) : (
                          <EyeIcon size={20} />
                        )}
                      </button>
                    }
                  />
                }
              />
            </Field>

            <Field className="flex-row items-center">
              <FieldControl
                name="remember_me"
                render={
                  <Checkbox>
                    <CheckboxIndicator />
                  </Checkbox>
                }
              />
              <FieldLabel className="pl-1">Remember me</FieldLabel>
            </Field>
          </div>

          <Button type="submit" className="mt-7 w-full">
            {isPending ? "Signing in ..." : "Sign in"}
          </Button>
        </form>
        <Button variant="link" className="mt-1 w-full">
          Forgot password
        </Button>
      </div>
    </div>
  );
};

export default Login;
