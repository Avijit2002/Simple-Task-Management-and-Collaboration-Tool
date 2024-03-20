"use client";

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
import { signIn } from "next-auth/react";
import Link from "next/link";

function SigninForm() {
  const form = useForm<typeSignup>({
    resolver: zodResolver(zodSignup),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: typeSignup) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
     signIn();

  }

  return (
    <Form {...form}>
      <div className="w-3/4 rounded-md border-2 border-gray-500 p-10 drop-shadow-sm">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h2 className="text-mycolor text-center text-4xl font-bold">
            Login
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
          <Button size={"lg"} type="submit">
            Submit
          </Button>
        </form>
        <h3 className="my-4 text-center text-lg">
          New here?
          <Link className="ml-2" href="http://localhost:3000/api/auth/signup">
            Sign up
          </Link>
        </h3>
      </div>
      <ToastContainer />
    </Form>
  );
}

export default SigninForm;
