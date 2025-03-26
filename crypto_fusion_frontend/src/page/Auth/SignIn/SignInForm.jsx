import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignInForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: "",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    // TODO: handle form submission
    console.log({ data });
  };

  return (
    <div>
      <h1 className="text-xl text-center font-bold mb-8">
        Please Sign In to Continue
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-white font-semibold border-white py-5 mb-6"
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
                    className="text-white font-semibold border-white py-5"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p
            className="px-1 mt-2 text-sm font-semibold cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password ?
          </p>
          <Button type="submit" className="w-full mt-6">
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
