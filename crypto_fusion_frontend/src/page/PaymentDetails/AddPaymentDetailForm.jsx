import { useForm } from "react-hook-form";

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

const AddPaymentDetailForm = () => {
  const form = useForm({
    resolver: "",
    defaultValues: {
      account_holder_name: "",
      ifsc: "",
      account_number: "",
      bank_name: "",
    },
  });

  const onSubmit = (data) => {
    // TODO: handle form submission
    console.log({data});
  };

  return (
    <div className="py-2 px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="account_holder_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input placeholder="Md Kaish Alam" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC</FormLabel>
                <FormControl>
                  <Input placeholder="SBIN06D" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="account_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="*********7869" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_account_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="8956574127869" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bank_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input placeholder="State Bank of India" {...field} />
                </FormControl>
                <FormMessage />
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
