import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const AccountVerificationForm = () => {
  const [otpValue, setOtpValue] = useState();
  
  const handleSubmit = () => {
    // TODO: Send OTP to the entered email address
    console.log("OTP submitted: ", otpValue);
  };
  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-2 w-full">
        <div className="flex justify-between items-center">
          <p>Email :</p>
          <p>alamkaishg1511@gmail.com</p>
          <Dialog>
            <DialogTrigger>
              <Button>Send OTP</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">Enter OTP</DialogTitle>
                <DialogDescription className="text-center">
                  We have sent OTP in your registered Email Address
                </DialogDescription>
              </DialogHeader>
              <div className="py-5 flex justify-center gap-5 items-center">
                <InputOTP
                  maxLength={6}
                  value={otpValue}
                  onChange={(value) => setOtpValue(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <DialogClose>
                  <Button onClick={handleSubmit}>
                    Submit
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationForm;
