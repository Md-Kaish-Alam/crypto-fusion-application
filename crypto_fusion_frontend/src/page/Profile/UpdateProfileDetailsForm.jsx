import * as yup from "yup";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { updateUserProfile } from "@/store/Auth/AuthAction";
import { useState } from "react";

// Validation schema for updating user details
const updateUserValidationSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  dateOfBirth: yup
    .date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
  nationality: yup.string().required("Nationality is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Pincode must be a 6-digit number")
    .required("Pincode is required"),
  country: yup.string().required("Country is required"),
});

const UpdateProfileDetailsForm = () => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: yupResolver(updateUserValidationSchema),
    defaultValues: {
      email: auth.user?.email,
      fullName: auth.user?.fullName,
      dateOfBirth: auth.user?.dateOfBirth
        ? new Date(auth.user?.dateOfBirth)
        : null,
      nationality: auth.user?.nationality,
      address: auth.user?.address,
      city: auth.user?.city,
      pincode: auth.user?.pincode,
      country: auth.user?.country,
    },
  });

  const onSubmit = (data) => {
    dispatch(updateUserProfile(data, localStorage.getItem("jwt")));
    console.log(data.dateOfBirth);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* email (disable because user can't update there email adderss) */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="text-white font-semibold border-white py-5"
                  placeholder="example123@gmail.com"
                  disabled
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-bold text-muted-foreground">
                You cannot update your email address after logging in, as it is
                permanently linked to your account for security and
                identification purposes.
              </FormMessage>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between gap-4">
          <div className="w-1/2">
            {/* fullName */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-white font-semibold border-white py-5"
                      placeholder="Full Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 font-bold">
                    {form.formState.errors.fullName?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          {/* date of birth */}
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <Popover
                    open={datePickerOpen}
                    onOpenChange={setDatePickerOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full text-left font-normal h-11 border border-white",
                            !field.value && "text-muted-foreground"
                          )}
                          onClick={() => setDatePickerOpen(true)}
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          if (date) {
                            // Adjust date to remove timezone issues
                            const adjustedDate = new Date(
                              Date.UTC(
                                date.getFullYear(),
                                date.getMonth(),
                                date.getDate()
                              )
                            );
                            field.onChange(adjustedDate);
                            setDatePickerOpen(false);
                          }
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        defaultMonth={field.value || new Date("2000-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="w-1/3">
            {/* nationality */}
            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-white font-semibold border-white py-5"
                      placeholder="Nationality"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 font-bold">
                    {form.formState.errors.nationality?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="w-2/3">
            {/* address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-white font-semibold border-white py-5"
                      placeholder="Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 font-bold">
                    {form.formState.errors.address?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="w-1/3">
            {/* city */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-white font-semibold border-white py-5"
                      placeholder="City"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 font-bold">
                    {form.formState.errors.city?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            {/* pincode */}
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-white font-semibold border-white py-5"
                      placeholder="Pincode"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 font-bold">
                    {form.formState.errors.pincode?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/3">
            {/* country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-white font-semibold border-white py-5"
                      placeholder="Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 font-bold">
                    {form.formState.errors.country?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogClose className="w-full">
          <Button type="submit" className="w-full">
            Update
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};

export default UpdateProfileDetailsForm;
