import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, ShieldAlert, VerifiedIcon } from "lucide-react";

import {
  enableTwoStepAuthentication,
  getUser,
  verifyOtp,
} from "@/store/Auth/AuthAction";
import { toast } from "@/hooks/use-toast";
import Loading from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AccountVerificationForm from "./AccountVerificationForm";
import UpdateProfileDetailsForm from "./UpdateProfileDetailsForm";

const Profile = () => {
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);

  const handleEnableTwoStepVerification = (otp) => {
    dispatch(
      enableTwoStepAuthentication({
        jwt: localStorage.getItem("jwt"),
        otp,
      })
    );
    toast({
      title: "Two Step Verification Enabled",
      description: "You have successfully enabled two step verification.",
      duration: 3000,
    });
  };

  const handleVerifyOtp = (otp) => {
    dispatch(
      verifyOtp({
        jwt: localStorage.getItem("jwt"),
        otp,
      })
    );
    toast({
      title: "Account Verified",
      description: "You have successfully verified your account.",
      duration: 3000,
    });
  };

  useEffect(() => {
    dispatch(getUser(localStorage.getItem("jwt")));
  }, [dispatch]);

  if (auth?.loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center mb-5">
      <div className="pt-10 w-full lg:w-[60%] ">
        <Card>
          <CardHeader className="pb-9">
            <CardTitle>
              <div className="flex items-center justify-between">
                <h1 className="text-xl">Your Information</h1>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="ghost" className="h-10 w-10 rounded-full">
                      <Edit className="scale-[1.2]" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl mb-4">
                        Update Profile Details
                      </DialogTitle>
                    </DialogHeader>
                    <UpdateProfileDetailsForm />
                  </DialogContent>
                </Dialog>
              </div>
            </CardTitle>
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
                  <p className="text-muted-foreground">
                    {auth.user?.dateOfBirth}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Nationality: </p>
                  <p className="text-muted-foreground">
                    {auth.user?.nationality}
                  </p>
                </div>
              </div>

              <div className="space-y-7">
                <div className="flex">
                  <p className="w-[9rem]">Address: </p>
                  <p className="text-muted-foreground">{auth.user?.address}</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">City: </p>
                  <p className="text-muted-foreground">{auth.user?.city}</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Pincode: </p>
                  <p className="text-muted-foreground">{auth.user?.pincode}</p>
                </div>
                <div className="flex">
                  <p className="w-[9rem]">Country: </p>
                  <p className="text-muted-foreground">{auth.user?.country}</p>
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
                {auth.user.twoFactorAuth?.enabled ? (
                  <Badge className="space-x-2 text-white bg-green-700 hover:bg-green-800">
                    <VerifiedIcon /> <span>{"Enabled"}</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-600 text-white space-x-2 hover:bg-orange-700">
                    <ShieldAlert /> <span>{"Disabled"}</span>
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger>
                  <Button disabled={auth.user?.twoFactorAuth?.enabled}>
                    Enable Two Step Verification
                  </Button>
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

        <div className="lg:flex gap-5 mt-5">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 ">
              <div className="flex items-center">
                <p className="w-[8rem]">Email :</p>
                <p>{auth.user.email}</p>
              </div>
              <div className="flex items-center">
                <p className="w-[8rem]">Password :</p>
                <Button variant="secondary">Change Password</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>Account Status</CardTitle>
                {auth.user.verified ? (
                  <Badge className="space-x-2 text-white bg-green-600">
                    <VerifiedIcon /> <span>verified</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">pending</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center">
                <p className="w-[8rem]">Email :</p>
                <p>{auth.user.email}</p>
              </div>
              <div className="flex items-center">
                <p className="w-[8rem]">Full Name :</p>
                <p>{auth.user?.fullName}</p>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger>
                    <Button>Verify Account</Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader className="">
                      <DialogTitle className="px-10 pt-5 text-center">
                        verify your account
                      </DialogTitle>
                    </DialogHeader>
                    <AccountVerificationForm handleSubmit={handleVerifyOtp} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
