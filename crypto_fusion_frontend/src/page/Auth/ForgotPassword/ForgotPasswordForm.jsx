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

const ForgotPasswordForm = () => {
  const form = useForm({
    resolver: "",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    // TODO: handle form submission
    console.log({ data });
  };

  return (
    <div>
      <h1 className="text-xl text-center font-bold">
        Forgot Password
      </h1>
      <p className="text-sm font-semibold text-center text-muted-foreground mb-6">Please verify your email address</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-white font-semibold placeholder:text-white border-white py-5 mb-6"
                    placeholder="example123@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
