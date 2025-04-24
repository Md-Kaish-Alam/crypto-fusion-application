import { Landmark } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { maskAccountNumber } from "@/lib/utils";
import { DialogClose } from "@/components/ui/dialog";
import {
  getPaymentDetails,
  withdrawalRequest,
} from "@/store/Withdrawal/WithdrawalAction";

const WithdrawalForm = () => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState("");

  const { wallet, withdrawal } = useSelector((store) => store);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      alert("Please enter an amount to withdraw.");
      return;
    } else {
      dispatch(withdrawalRequest({ amount, jwt: localStorage.getItem("jwt") }));
    }
    setAmount("");
  };

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  return (
    <div className="pt-10 space-y-5">
      <div className="flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4">
        <p>Available Balance</p>
        <p>${wallet.userWallet?.balance}</p>
      </div>
      <div className="flex flex-col items-center gap-2">
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
            <p className="text-xl font-semibold">
              {withdrawal.paymentDetails?.bankName.toUpperCase()}
            </p>
            <p className="text-xs text-muted-foreground">
              {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
            </p>
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
          Withdraw {amount && <span className="ml-2">${amount}</span>}
        </Button>
      </div>
    </div>
  );
};

export default WithdrawalForm;
