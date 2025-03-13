import { useState } from "react";
import { Dot } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AddMoneyForm = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add money to wallet
    console.log({ amount, paymentMethod });
    setAmount("");
    setPaymentMethod("RAZORPAY");
  };

  return (
    <div className="pt-10 space-y-5">
      <div>
        <h1 className="pb-1">Enter Amount</h1>
        <Input
          value={amount}
          onChange={handleAmountChange}
          placeholder="$ 0.00"
          className="py-7 text-lg"
        />
      </div>
      <div>
        <h1 className="pb-1">Select Payment Method</h1>
        <RadioGroup
          className="flex"
          defaultValue="RAZORPAY"
          value={paymentMethod}
          onValueChange={handlePaymentMethodChange}
        >
          <div className="flex items-center space-x-2 border p-3 rounded-md">
            <RadioGroupItem
              id="r1"
              icon={Dot}
              className="h-4 w-4"
              value="RAZORPAY"
            />
            <Label htmlFor="r1">
              <div className="bg-white rounded-md px-5 py-2 w-32">
                <img src="./Razorpay_logo.png" alt="Razorpay_logo" />
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border p-3 rounded-md">
            <RadioGroupItem
              id="r2"
              icon={Dot}
              className="h-4 w-4"
              value="STRIPE"
            />
            <Label htmlFor="r2">
              <div className="bg-white rounded-md px-5 py-2 w-fit">
                <img
                  className="h-5"
                  src="./Stripe_Logo.png"
                  alt="Stripe_Logo"
                />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex items-center justify-between pt-5">
        <DialogClose>
          <Button size="lg" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button size="lg" variant="default" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddMoneyForm;
