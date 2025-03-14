import { Landmark } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CopyButton } from "@/components/CopyButton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddPaymentDetailForm from "./AddPaymentDetailForm";

const isPaymentDetailAdded = true;
const PaymentDetails = () => {
  return (
    <div className="px-20">
      <h1 className="text-2xl text-muted-foreground font-semibold my-10">
        Payment Details
      </h1>

      {isPaymentDetailAdded ? (
        <Card className="w-fit">
          <CardHeader>
            <div className="flex items-center gap-5 rounded-md">
              <Landmark className="bg-gray-600 h-10 w-10 p-1 rounded-md" />
              <div>
                <p className="text-xl font-semibold">IDFC Bank</p>
                <p className="text-xs text-muted-foreground">**********7869</p>
              </div>
              <CopyButton value="12345676547869" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="w-40">A/C Holder Name</p>
              <p className="text-muted-foreground">Md Kaish Alam</p>
              <CopyButton value="Md Kaish Alam" />
            </div>
            <div className="flex items-center gap-2">
              <p className="w-40">IFSC Code</p>
              <p className="text-muted-foreground">IDFC761ON</p>
              <CopyButton value="IDFC761ON" />
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
