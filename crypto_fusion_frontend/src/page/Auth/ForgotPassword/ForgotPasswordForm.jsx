import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendResetPassowrdOTP } from "@/store/Auth/AuthAction";

// Validation schema using Yup
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verificationType, setVerificationType] = useState("EMAIL");

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(
      sendResetPassowrdOTP({
        sendTo: data.email,
        navigate,
        verificationType,
      })
    );
    form.reset();
    setVerificationType("EMAIL");
  };

  return (
    <div>
      <h1 className="text-xl text-center font-bold">Forgot Password</h1>
      <p className="text-sm font-semibold text-center text-muted-foreground mb-6">
        Please verify your email address
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-white font-semibold border-white py-5"
                    placeholder="example123@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-bold">
                  {form.formState.errors.email?.message}
                </FormMessage>
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
