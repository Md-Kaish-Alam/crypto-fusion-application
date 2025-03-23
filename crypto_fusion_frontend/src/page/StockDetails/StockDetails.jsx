import { useState } from "react";
import { Bookmark, BookmarkCheck, Dot } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import TradingForm from "./TradingForm";
import StockChart from "../Home/StockChart";

const StockDetails = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: handle bookmark functionality
  };

  return (
    <div className="p-5 mt-5">
      <div className="flex justify-between">
        <div className="flex gap-5 items-center">
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
        <div className="flex items-center gap-3">
          <Button className="h-10 w-10" onClick={handleBookmark}>
            {isBookmarked ? (
              <BookmarkCheck className="scale-[1.5]" />
            ) : (
              <Bookmark className="scale-[1.3]" fill="black" />
            )}
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button size="lg">Trade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">
                  How much do you want to spend ?
                </DialogTitle>
              </DialogHeader>
              <TradingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stock Chart */}
      <div className="mt-10">
        <StockChart />
      </div>
    </div>
  );
};

export default StockDetails;
