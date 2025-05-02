import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

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
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { sendVerificationOtp } from "@/store/Auth/AuthAction";

const AccountVerificationForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);
  const [otpValue, setOtpValue] = useState();

  const handleSendOtp = (verificationType) => {
    dispatch(
      sendVerificationOtp({
        verificationType,
        jwt: localStorage.getItem("jwt"),
      })
    );
    toast({
      title: "OTP Sent",
      description: `We have sent OTP to your registered ${verificationType}`,
      duration: 3000,
    });
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-2 w-full">
        <div className="flex justify-between items-center">
          <p>Email :</p>
          <p>{auth.user?.email}</p>
          <Dialog>
            <DialogTrigger>
              <Button onClick={() => handleSendOtp("EMAIL")}>Send OTP</Button>
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
                  <Button onClick={() => handleSubmit(otpValue)}>Submit</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

AccountVerificationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default AccountVerificationForm;
