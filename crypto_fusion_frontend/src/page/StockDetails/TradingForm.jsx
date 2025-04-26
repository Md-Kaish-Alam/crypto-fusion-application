import { Dot } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { getUserWallet } from "@/store/Wallet/WalletAction";
import { getAssetDetails } from "@/store/Asset/AssetAction";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { payOrder } from "@/store/Order/OrderAction";

function calculateBuyCost(amountUSD, cryptoPrice) {
  let volume = amountUSD / cryptoPrice;

  let decimalPlaces = Math.max(2, cryptoPrice.toString().split(".")[0].length);

  return volume.toFixed(decimalPlaces);
}

const TradingForm = () => {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState();
  const [quantity, setQuantity] = useState(0);
  const [orderType, setOrderType] = useState("BUY");

  const { asset, coin, wallet } = useSelector((state) => state);

  const handleChange = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
    const volume = calculateBuyCost(
      amount,
      coin.coinDetails.market_data.current_price.usd
    );
    setQuantity(volume);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);

    if (!numericAmount || numericAmount <= 0 || isNaN(numericAmount)) {
      setAmount("");
      setQuantity(0);
      setOrderType("BUY");
      alert("Please enter a valid amount greater than 0.");
      return;
    }

    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount: numericAmount,
        orderData: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
        },
      })
    );
    setAmount("");
    setQuantity(0);
    setOrderType("BUY");
  };

  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(
      getAssetDetails({
        coinId: coin.coinDetails?.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, [coin.coinDetails?.id, dispatch]);

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
              {quantity}
            </p>
          </div>
        </div>

        {orderType == "SELL"
          ? asset.assetDetails?.quantity * coin.coinDetails?.current_price <
              amount && (
              <h1 className="text-red-800 text-center pt-4">
                Insufficient quantity to sell
              </h1>
            )
          : quantity * coin.coinDetails?.market_data.current_price.usd >
              wallet.userWallet?.balance && (
              <h1 className="text-red-800 text-center pt-4">
                Insufficient Wallet Balance To Buy
              </h1>
            )}
      </div>

      <div className="border p-3 rounded-md flex gap-5 items-center">
        <div>
          <Avatar>
            <AvatarImage src={coin.coinDetails?.image.large} />
          </Avatar>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
            <Dot className="text-muted-foreground" />
            <p className="text-muted-foreground">{coin.coinDetails?.name}</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">
              ${coin.coinDetails?.market_data.current_price.usd}
            </p>
            <p
              className={`${
                coin.coinDetails?.market_data.market_cap_change_24h < 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              <span className="">
                {coin.coinDetails?.market_data.market_cap_change_24h}
              </span>
              <span>
                (
                {coin.coinDetails?.market_data.market_cap_change_percentage_24h}
                %)
              </span>
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
          <p>
            {orderType == "BUY" ? "Available Balance" : "Available Quantity"}
          </p>
          <p className="text-muted-foreground">
            {orderType == "BUY" ? (
              <div className="flex items-center ">
                <span className="text-xl font-semibold">
                  ${wallet.userWallet?.balance}
                </span>
              </div>
            ) : (
              <p>{asset.assetDetails?.quantity || 0}</p>
            )}
          </p>
        </div>
        <div className="pt-5">
          <DialogClose className="w-full">
            <Button
              className={`w-full py-6 text-white text-lg ${
                orderType == "SELL"
                  ? "bg-red-600 hover:bg-red-800"
                  : "bg-green-600 hover:bg-green-800"
              }`}
              disabled={
                quantity == 0 ||
                (orderType == "SELL" && !asset.assetDetails?.quantity) ||
                (orderType == "SELL"
                  ? asset.assetDetails?.quantity *
                      coin.coinDetails?.market_data.current_price.usd <
                    amount
                  : quantity * coin.coinDetails?.market_data.current_price.usd >
                    wallet.userWallet?.balance)
              }
              onClick={handleSubmit}
            >
              {orderType}
            </Button>
          </DialogClose>
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
