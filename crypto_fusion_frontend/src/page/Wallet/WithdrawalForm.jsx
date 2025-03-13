import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Landmark } from "lucide-react";
import { useState } from "react";

const WithdrawalForm = () => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Withdraw money from wallet
    console.log({ amount });
    setAmount("");
  };
  return (
    <div className="pt-10 space-y-5">
      <div className="flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4">
        <p>Available Balance</p>
        <p>$22489.36</p>
      </div>
      <div className="flex flex-col items-center">
        <h1>Enter withdrawal amount</h1>
        <div className="flex items-center justify-center">
          <Input
            value={amount}
            onChange={handleAmountChange}
            placeholder="$ 0.00"
            className="withdrawalInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center"
            type="number"
          />
        </div>
      </div>
      <div>
        <p className="pb-2">Transfer To</p>
        <div className="flex items-center gap-5 border p-2 rounded-md">
          <Landmark className="bg-gray-600 h-10 w-10 p-1 rounded-md" />
          <div>
            <p className="text-xl font-semibold">IDFC Bank</p>
            <p className="text-xs text-muted-foreground">**********7869</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-5">
        <DialogClose>
          <Button size="lg" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button size="lg" variant="default" onClick={handleSubmit}>
          Withdraw
        </Button>
      </div>
    </div>
  );
};

export default WithdrawalForm;
