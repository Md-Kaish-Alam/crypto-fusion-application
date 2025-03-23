import { useState } from "react";
import { Dot } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const TradingForm = () => {

  const [amount, setAmount] = useState();
  const [orderType, setOrderType] = useState("BUY");
  
  const isBalanceInsufficient = false;
  
  const handleChange = (e) => {
    // TODO: Handle amount change
    e.preventDefault();
    setAmount(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit trade request
    console.log({ amount, orderType });
    setAmount("");
    setOrderType("BUY");
  };
  
  return (
    <div className="space-y-8 p-5">
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            name="amount"
            type="number"
            value={amount}
            onChange={handleChange}
            placeholder="Enter Amount..."
            className="py-7 focus:outline-none"
          />
          <div>
            <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
              646.51
            </p>
          </div>
        </div>

        {isBalanceInsufficient && (
          <h1 className="text-red-600 text-center mt-4">
            Insufficient wallet balance to buy.
          </h1>
        )}
      </div>

      <div className="border p-3 rounded-md flex gap-5 items-center">
        <div>
          <Avatar>
            <AvatarImage src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" />
          </Avatar>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p>BTC</p>
            <Dot className="text-muted-foreground" />
            <p className="text-muted-foreground">Bitcoin</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">$86424</p>
            <p className="text-red-600">
              <span>-38341779668.75586</span> <span>(-2.18831%)</span>
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p>Order Type</p>
          <p className="text-muted-foreground">Market Order</p>
        </div>
        <div className="flex items-center justify-between">
          <p>{orderType == "BUY" ? "Available Balance" : "Available Quantity"}</p>
          <p className="text-muted-foreground">{orderType == "BUY" ? "$2089.87" : "45.08"}</p>
        </div>
        <div className="pt-5">
          <Button
            className={`w-full py-6 text-white text-lg ${
              orderType == "SELL"
                ? "bg-red-600 hover:bg-red-800"
                : "bg-green-600 hover:bg-green-800"
            }`}
            onClick={handleSubmit}
          >
            {orderType}
          </Button>
          <Button
            variant="link"
            className="w-full mt-5"
            onClick={() => setOrderType(orderType == "BUY" ? "SELL" : "BUY")}
          >
            {orderType == "BUY" ? "Or SELL" : "Or BUY"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradingForm;
