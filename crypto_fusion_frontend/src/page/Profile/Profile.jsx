import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShieldAlert, VerifiedIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AccountVerificationForm from "./AccountVerificationForm";

const Profile = () => {
  const { auth } = useSelector((store) => store);

  const handleEnableTwoStepVerification = () => {
    // TODO: Add logic to enable two-step verification
    console.log("EnableTwoStepVerification");
  };
  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%] ">
        <Card>
          <CardHeader className="pb-9">
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="lg:flex gap-32">
              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Email: </p>
                  <p className="text-muted-foreground">{auth.user?.email}</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Full Name: </p>
                  <p className="text-muted-foreground">{auth.user?.fullName}</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Date of Birth: </p>
                  <p className="text-muted-foreground">16/01/2002</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Nationality: </p>
                  <p className="text-muted-foreground">Indian</p>
                </div>
              </div>

              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Address: </p>
                  <p className="text-muted-foreground">
                    103, Green Glan Layout, Bellandur
                  </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">City: </p>
                  <p className="text-muted-foreground">Bengaluru</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Pincode: </p>
                  <p className="text-muted-foreground">560103</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Country: </p>
                  <p className="text-muted-foreground">India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>
                <Badge className="space-x-2 text-white bg-green-700 hover:bg-green-800">
                  <VerifiedIcon /> <span>{"Enabled"}</span>
                </Badge>
                <Badge className="bg-orange-600 text-white space-x-2 hover:bg-orange-700">
                  <ShieldAlert /> <span>{"Disabled"}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger>
                  <Button>Enable Two Step Verification</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mt-2 text-center">
                      Verify your account
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Plase Verify your account to enable two step verification
                    </DialogDescription>
                  </DialogHeader>
                  <AccountVerificationForm
                    handleSubmit={handleEnableTwoStepVerification}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
