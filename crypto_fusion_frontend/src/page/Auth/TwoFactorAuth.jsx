import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import CustomeToast from "@/components/CustomeToast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { twoStepVerification } from "@/store/Auth/AuthAction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TwoFactorAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { session } = useParams();
  const { auth } = useSelector((store) => store);

  const [value, setValue] = useState("");

  const handleTwoFactoreAuth = () => {
    dispatch(twoStepVerification({ otp: value, session, navigate }));
  };

  return (
    <div>
      <CustomeToast show={auth.error} message={auth.error?.error} />
      <div className="flex flex-col gap-5 h-screen justify-center items-center">
        {" "}
        <Card className="p-5 flex flex-col justify-center items-center">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://cdn.dribbble.com/users/1125847/screenshots/15197732/media/7201b01895b7b60d33eea77d098eb7b3.png?resize=1600x1200&vertical=center" />
          </Avatar>
          <CardHeader>
            <div className="flex items-center gap-5">
              <h1 className="text-xl font-semibold">Two Step Verification</h1>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-col gap-5 items-center justify-center">
              <InputOTP
                value={value}
                onChange={(value) => setValue(value)}
                maxLength={6}
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
              <div className="text-center">
                <p>OTP has been sent to your email.</p>
                <p className="text-sm text-muted-foreground">
                  Please check your inbox and also the spam or junk folder if
                  you don&apos;t see it there.
                </p>
              </div>
            </div>
            <Button onClick={handleTwoFactoreAuth} className="w-full">
              Verify
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
