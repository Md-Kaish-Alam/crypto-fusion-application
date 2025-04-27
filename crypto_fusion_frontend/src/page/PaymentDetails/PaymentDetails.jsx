import { useEffect } from "react";
import { Landmark } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { maskAccountNumber } from "@/lib/utils";
import { CopyButton } from "@/components/CopyButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPaymentDetails } from "@/store/Withdrawal/WithdrawalAction";

import AddPaymentDetailForm from "./AddPaymentDetailForm";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  if (withdrawal?.loading) {
    return <Loading />;
  }

  return (
    <div className="px-20">
      <h1 className="text-2xl text-muted-foreground font-semibold my-10">
        Payment Details
      </h1>

      {withdrawal.paymentDetails ? (
        <Card className="w-fit">
          <CardHeader>
            <div className="flex items-center gap-5 rounded-md">
              <Landmark className="bg-gray-600 h-10 w-10 p-1 rounded-md" />
              <div>
                <p className="text-xl font-semibold">
                  {withdrawal.paymentDetails?.bankName.toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground">
                  {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
                </p>
              </div>
              <CopyButton value={withdrawal.paymentDetails?.accountNumber} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="w-40">A/C Holder Name</p>
              <p className="text-muted-foreground">
                {withdrawal.paymentDetails?.accountHolderName}
              </p>
              <CopyButton
                value={withdrawal.paymentDetails?.accountHolderName}
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="w-40">IFSC Code</p>
              <p className="text-muted-foreground">
                {withdrawal.paymentDetails?.ifsc.toUpperCase()}
              </p>
              <CopyButton
                value={withdrawal.paymentDetails?.ifsc.toUpperCase()}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger className="mt-5">
            <Button className="py-6">Add Payment Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <AddPaymentDetailForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
