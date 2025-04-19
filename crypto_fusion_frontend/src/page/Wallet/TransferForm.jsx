import { useState } from "react";
import { useDispatch } from "react-redux";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { transferMoney } from "@/store/Wallet/WalletAction";

const TransferForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    wallet_id: "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    purpose: "",
    wallet_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const validate = () => {
    const newErrors = {
      amount: formData.amount ? "" : "Amount is required",
      purpose: formData.purpose ? "" : "Purpose is required",
      wallet_id: formData.wallet_id ? "" : "Wallet ID is required",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err); // true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.wallet_id,
        reqData: {
          amount: formData.amount,
          purpose: formData.purpose,
        },
      })
    );

    setFormData({ amount: "", wallet_id: "", purpose: "" });
  };

  return (
    <div className="pt-10 space-y-5">
      <div className="flex items-center justify-between gap-5">
        <div className="w-[50%]">
          <Label>Enter Amount</Label>
          <Input
            name="amount"
            value={formData.amount}
            placeholder="$ 0.00"
            onChange={handleChange}
            className="mt-2 py-7"
          />
          {errors.amount && (
            <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
          )}
        </div>
        <div className="w-[50%]">
          <Label>Enter Wallet Id</Label>
          <Input
            name="wallet_id"
            value={formData.wallet_id}
            placeholder="#151611"
            onChange={handleChange}
            className="mt-2 py-7"
          />
          {errors.wallet_id && (
            <p className="text-sm text-red-500 mt-1">{errors.wallet_id}</p>
          )}
        </div>
      </div>
      <div>
        <Label>Purpose</Label>
        <Input
          name="purpose"
          value={formData.purpose}
          placeholder="Investment in Crypto Fund"
          onChange={handleChange}
          className="mt-2 py-7"
        />
        {errors.purpose && (
          <p className="text-sm text-red-500 mt-1">{errors.purpose}</p>
        )}
      </div>
      <div className="flex items-center justify-between pt-5">
        <DialogClose>
          <Button size="lg" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button size="lg" variant="default" onClick={handleSubmit}>
          Transfer
        </Button>
      </div>
    </div>
  );
};

export default TransferForm;
