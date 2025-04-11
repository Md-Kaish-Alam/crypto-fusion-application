import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, Dot, Link } from "lucide-react";

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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "@/store/Coin/CoinAction";

const StockDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { coin } = useSelector((store) => store);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    dispatch(
      fetchCoinDetails({ coinId: id, jwt: localStorage.getItem("jwt") })
    );
  }, [dispatch, id]);

  console.log({ coin });
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
              <AvatarImage src={coin.coinDetails?.image.large} />
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
              <Dot className="text-muted-foreground" />
              <p className="text-muted-foreground">{coin.coinDetails?.name}</p>
              <Link
                className="h-4 w-4 text-blue-400 cursor-pointer mx-1"
                onClick={() => {
                  const url = coin?.coinDetails?.links?.homepage[0];
                  if (url) {
                    window.open(
                      url.startsWith("http") ? url : `https://${url}`,
                      "_blank"
                    );
                  }
                }}
              />
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">
                ${coin.coinDetails?.market_data?.current_price?.usd}
              </p>
              <p className="text-red-600">
                <span>
                  {coin.coinDetails?.market_data?.market_cap_change_24h}
                </span>{" "}
                <span>
                  (
                  {
                    coin.coinDetails?.market_data
                      ?.market_cap_change_percentage_24h
                  }
                  %)
                </span>
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
              <Button size="lg" className="text-lg">
                Trade
              </Button>
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
        <StockChart coinId={id} />
      </div>
    </div>
  );
};

export default StockDetails;
