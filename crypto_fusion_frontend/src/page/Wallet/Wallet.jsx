import {
  Copy,
  Upload,
  Shuffle,
  Wallet2,
  Download,
  DollarSign,
  RefreshCcw,
  CheckCheck,
} from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AddMoneyForm from "./AddMoneyForm";
import TransferForm from "./TransferForm";
import WithdrawalForm from "./WithdrawalForm";

const transaction_history = [
  {
    title: "Withdrawal",
    date: "2025-03-09",
    amount: "-150.00",
  },
  {
    title: "Buy Asset",
    date: "2025-03-08",
    amount: "-320.75",
  },
  {
    title: "Sell Asset",
    date: "2025-03-07",
    amount: "+540.25",
  },
  {
    title: "Wallet Transfer",
    date: "2025-03-06",
    amount: "-200.50",
  },
  {
    title: "Withdrawal",
    date: "2025-03-05",
    amount: "-75.00",
  },
  {
    title: "Buy Asset",
    date: "2025-03-04",
    amount: "-95.30",
  },
  {
    title: "Sell Asset",
    date: "2025-03-03",
    amount: "+272.00",
  },
  {
    title: "Wallet Transfer",
    date: "2025-03-02",
    amount: "-65.90",
  },
];

const Wallet = () => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = (value) => {
    if (!value) return;

    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const IdCopyIcon = isCopied ? CheckCheck : Copy;
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
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-muted-foreground text-sm">#AA56DH</p>
                    <Button
                      variant="ghost"
                      className="h-8 w-8"
                      disabled={isCopied}
                      onClick={() => onCopy("#AA56DH")}
                    >
                      <IdCopyIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button size="icon" variant="ghost">
                <RefreshCcw className="scale-[1.5]" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign />
              <span className="text-2xl font-semibold">34685.00</span>
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
            <h1 className="text-2xl font-semibold">Transaction History</h1>
            <Button size="icon" variant="ghost">
              <RefreshCcw className="scale-[1.5]" />
            </Button>
          </div>

          <div className="space-y-5">
            {transaction_history.map((history, index) => (
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
                    <h1>{history.title}</h1>
                    <p className="text-sm text-muted-foreground">
                      {history.date}
                    </p>
                  </div>
                </div>
                <div>
                  <p
                    className={`${
                      history.amount > 0 ? "text-green-500" : "text-red-600"
                    }`}
                  >
                    ${history.amount}
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
