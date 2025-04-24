import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { addPaymentDetails } from "@/store/Withdrawal/WithdrawalAction";

const validationSchema = yup.object().shape({
  accountHolderName: yup.string().required("Account holder name is required"),
  ifsc: yup
    .string()
    .required("IFSC is required")
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  accountNumber: yup
    .string()
    .required("Account number is required")
    .matches(/^[0-9]{9,18}$/, "Account number must be 9-18 digits"),
  confirmAccountNumber: yup
    .string()
    .oneOf([yup.ref("accountNumber"), null], "Account numbers must match")
    .required("Please confirm account number"),
  bankName: yup.string().required("Bank name is required"),
});

const AddPaymentDetailForm = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);
  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      accountNumber: "",
      accountHolderName: "",
      ifsc: "",
      bankName: "",
    },
  });

  const onSubmit = (data) => {
    if (!withdrawal.paymentDetails) {
      dispatch(
        addPaymentDetails({
          paymentDetails: data,
          jwt: localStorage.getItem("jwt"),
        })
      );
    }

    form.reset();
  };

  return (
    <div className="py-2 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Account Holder Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Md Kaish Alam" {...field} />
                </FormControl>
                <FormMessage className="text-red-500 font-bold">
                  {form.formState.errors.accountHolderName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">IFSC</FormLabel>
                <FormControl>
                  <Input placeholder="SBIN0001234" {...field} />
                </FormControl>
                <FormMessage className="text-red-500 font-bold">
                  {form.formState.errors.ifsc?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="123456789012" {...field} />
                </FormControl>
                <FormMessage className="text-red-500 font-bold">
                  {form.formState.errors.accountNumber?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  Confirm Account Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="123456789012" {...field} />
                </FormControl>
                <FormMessage className="text-red-500 font-bold">
                  {form.formState.errors.confirmAccountNumber?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Bank Name</FormLabel>
                <FormControl>
                  <Input placeholder="State Bank of India" {...field} />
                </FormControl>
                <FormMessage className="text-red-500 font-bold">
                  {form.formState.errors.bankName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between pt-5">
            <DialogClose>
              <Button size="lg" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" size="lg" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddPaymentDetailForm;
