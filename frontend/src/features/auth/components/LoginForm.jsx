import { useForm } from "react-hook-form";
import { Shield } from "lucide-react";
import { Button } from "@/ui/button";
import { Field, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { NavLink,  } from "react-router";
import {ShieldLoader} from "@/ui/SheildLoader.jsx";
import useAuth from "../../../hooks/useAuth";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
   
const {login,loading} =useAuth();
  return (
  <> {loading && (<ShieldLoader/>) }  <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <Shield className="text-primary-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">
            Welcome Back
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your Amber Safety account
          </p>
        </div>

        <form
          onSubmit={handleSubmit(login)}
          className="space-y-4 rounded-xl border border-border bg-card p-6"
        >
          <Field>
            <FieldLabel htmlFor="input-field-email">Email</FieldLabel>
            <Input
              id="input-field-email"
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
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
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </Field>

          <Button size="udc" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <NavLink
            to="/auth/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </NavLink>
        </p>
      </div>
    </div></>
 
  );
}

export default LoginForm;
