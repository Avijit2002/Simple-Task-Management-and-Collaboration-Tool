"use client";

import { api } from "~/trpc/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { zodSignup, typeSignup } from "~/zod";

import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

function SignForm() {
  const form = useForm<typeSignup>({
    resolver: zodResolver(zodSignup),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, data, error, isError, isSuccess, isPending } =
    api.user.signup.useMutation();

  useEffect(() => {
    function triggerNotification() {
      isError &&
        toast.error(error.message, {
          position: "top-center",
        });
      isSuccess &&
        toast.success(data.message, {
          position: "top-center",
        });
    }
    triggerNotification();
  }, [isError, isSuccess]);

  // 2. Define a submit handler.
  async function onSubmit(values: typeSignup) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    mutate(values);
  }

  return (
    <Form {...form}>
      <div className="w-3/4 rounded-md border-2 border-gray-500 p-10 drop-shadow-sm">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h2 className="text-mycolor text-center text-4xl font-bold">
            Sign up
          </h2>
          <p className="font-semi text-center text-xl text-gray-600">
            Enter your credentials to create an account
          </p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h2 className="text-xl">Email</h2>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="avijit@gamil.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <h2 className="text-xl">Password</h2>
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormDescription>Please set a strong password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"default"} size={"lg"} type="submit">
            Submit
          </Button>
        </form>
        <h3 className="my-4 text-center text-lg">
          Already Registered?
          <Link className="ml-2" href={"/signin"}>
            Login
          </Link>
        </h3>
      </div>
      <ToastContainer />
    </Form>
  );
}

export default SignForm;