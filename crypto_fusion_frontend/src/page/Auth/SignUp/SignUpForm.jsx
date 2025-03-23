import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpForm = () => {
  const form = useForm({
    resolver: "",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data) => {
    // TODO: handle form submission
    console.log({ data });
  };

  return (
    <div>
      <h1 className="text-xl text-center font-bold mb-8">
        Create your account to continue
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-white font-semibold placeholder:text-white border-white py-5"
                    placeholder="Full Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-white font-semibold placeholder:text-white border-white py-5"
                    placeholder="example123@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-white font-semibold placeholder:text-white border-white py-5"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-white font-semibold placeholder:text-white border-white py-5"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SignUpForm
