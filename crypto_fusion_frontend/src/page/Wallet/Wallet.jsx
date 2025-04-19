import {
  Upload,
  Shuffle,
  Wallet2,
  Download,
  DollarSign,
  RefreshCcw,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  depositMoney,
  getUserWallet,
  getWalletTransactions,
} from "@/store/Wallet/WalletAction";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/CopyButton";
import { generateStripePaymentId } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AddMoneyForm from "./AddMoneyForm";
import TransferForm from "./TransferForm";
import WithdrawalForm from "./WithdrawalForm";

function useQuery() {
  return new URLSearchParams(window.location.search);
}
const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallet } = useSelector((store) => store);

  const query = useQuery();
  const orderId = query.get("order_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");

  // generate stripe ID only once on initial mount
  const stripePaymentId = useMemo(() => generateStripePaymentId(), []);

  useEffect(() => {
    if (orderId) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId,
          paymentId: razorpayPaymentId || stripePaymentId,
          navigate,
        })
      );
    }
  }, [orderId, stripePaymentId, razorpayPaymentId, dispatch, navigate]);

  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center">
      <div className="pt-10 w-[full] lg:w-[60%]">
        <Card>
          <CardHeader className="pb-9">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <Wallet2 size={40} />
                <div>
                  <CardTitle className="text-2xl">My Wallet</CardTitle>
                  <div className="flex items-center gap-1">
                    <p className="text-muted-foreground text-sm">
                      #{wallet.userWallet?.id}
                    </p>
                    <CopyButton
                      value={wallet.userWallet?.id?.toString() || " "}
                    />
                  </div>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => window.location.reload()}
              >
                <RefreshCcw className="scale-[1.5] cursor-pointer" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign />
              <span className="text-2xl font-semibold">
                {wallet.userWallet?.balance}
              </span>
            </div>

            <div className="flex gap-6 mt-5">
              {/* Add Money */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center gap-2 rounded-md shadow-slate-900 shadow-md">
                    <Upload />
                    <span className="text-sm">Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                      Add money to your wallet
                    </DialogTitle>
                  </DialogHeader>
                  <AddMoneyForm />
                </DialogContent>
              </Dialog>

              {/* Withdrawal Money*/}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center gap-2 rounded-md shadow-slate-900 shadow-md">
                    <Download />
                    <span className="text-sm">Withdrawal</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                      Request Withdrawal
                    </DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>

              {/* Transfer Money */}
              <Dialog>
                <DialogTrigger>
                  <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center gap-2 rounded-md shadow-slate-900 shadow-md">
                    <Shuffle />
                    <span className="text-sm">Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                      Transfer to other&apos;s wallet
                    </DialogTitle>
                  </DialogHeader>
                  <TransferForm />
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="py-5 mt-2">
          <div className="flex gap-3 items-center pb-5">
            <h1 className="text-2xl font-semibold">Transaction item</h1>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => window.location.reload()}
            >
              <RefreshCcw className="scale-[1.5]" />
            </Button>
          </div>

          <div className="space-y-5">
            {wallet.transactions?.map((item, index) => (
              <Card
                key={index}
                className="px-5 flex justify-between items-center py-2"
              >
                {/* lg:w-[50%] */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      <Shuffle />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h1>{item.type || item.purpose}</h1>
                    <p className="text-sm text-muted-foreground">
                      {item.date}
                    </p>
                  </div>
                </div>
                <div>
                  <p
                    className={`${
                      item.amount > 0 ? "text-green-500" : "text-red-600"
                    }`}
                  >
                    ${item.amount}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
