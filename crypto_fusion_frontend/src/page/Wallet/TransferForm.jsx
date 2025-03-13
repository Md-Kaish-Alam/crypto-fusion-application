import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

const TransferForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    wallet_id: "",
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: handle transfer logic here
    console.log(formData)
    setFormData({ amount: "", wallet_id: "", purpose: "" })
  }
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
        </div>
        <div className="w-[50%]">
          <Label>Enter Wallet Id</Label>
          <Input
            name="wallet_id"
            value={formData.wallet_id}
            placeholder="#AA568R4"
            onChange={handleChange}
            className="mt-2 py-7"
          />
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
}

export default TransferForm
