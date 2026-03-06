import { useForm } from "react-hook-form";
import { Shield } from "lucide-react";
import { Button } from "@/ui/button";
import { Field, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { NavLink,  } from "react-router";
import useAuth from "../../../hooks/useAuth";
function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signUp,loading} = useAuth();
  return (
    <>   
     {loading && (<ShieldLoader/>) }  <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <Shield className="text-primary-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">
            Create Account
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Join Amber Safety Enterprises
          </p>
        </div>

        <form
          onSubmit={handleSubmit(signUp)}
          className="space-y-4 rounded-xl border border-border bg-card p-6"
        >
          <Field>
            <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
            <Input
              id="input-field-username"
              type="text"
              placeholder="Enter your username"
              {...register("username", { required: true, minLength: 3 })}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="input-field-email">Email</FieldLabel>
            <Input
              id="input-field-email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="input-field-password">Password</FieldLabel>
            <Input
              id="input-field-password"
              type="password"
              placeholder="Enter your Password"
              {...register("password", { required: true })}
            />
          </Field>

          <Button size="udc">Create Account</Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Have an account?{" "}
          <NavLink
            to={"/auth/login"}
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
    </>

  );
}
export default SignUpForm;
