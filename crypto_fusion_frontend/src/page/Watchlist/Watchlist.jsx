import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getUserWatchlist,
  removeItemFromWatchlist,
} from "@/store/Watchlist/WatchlistAction";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Watchlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { watchlist } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleRemoveToWatchlist = (coinId) => {
    dispatch(
      removeItemFromWatchlist({ jwt: localStorage.getItem("jwt"), coinId })
    );
  };

  if (watchlist?.items?.length === 0) {
    return (
      <div className="p-5 lg:p-12">
        <h1 className="font-bold text-xl pb-5 text-muted-foreground">
          Watchlist
        </h1>
        <p className="text-muted-foreground">No items found</p>
      </div>
    );
  }

  if (watchlist?.loading) {
    return <Loading />;
  }

  return (
    <div className="p-5 lg:p-12">
      <h1 className="font-bold text-xl pb-5 text-muted-foreground">
        Watchlist
      </h1>
      <Table className="border border-secondary">
        <TableHeader className="bg-secondary">
          <TableRow className="uppercase">
            <TableHead className="w-[100px]">coin</TableHead>
            <TableHead>symbol</TableHead>
            <TableHead>volume</TableHead>
            <TableHead>market cap</TableHead>
            <TableHead>24hrs</TableHead>
            <TableHead>price</TableHead>
            <TableHead className="text-right text-red-600">remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.items.map((coin) => (
            <TableRow key={coin.id}>
              <TableCell
                className="font-medium flex items-center gap-1 cursor-pointer"
                onClick={() => navigate(`/market/${coin.id}`)}
              >
                <Avatar className="-z-50">
                  <AvatarImage src={coin.image} />
                  <AvatarFallback>{coin.name}</AvatarFallback>
                </Avatar>
                <span className="ml-2">{coin.name}</span>
              </TableCell>
              <TableCell>{coin.symbol}</TableCell>
              <TableCell>{coin.total_volume}</TableCell>
              <TableCell>{coin.market_cap}</TableCell>
              <TableCell
                className={`${
                  coin.market_cap_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {coin.market_cap_change_percentage_24h}%
              </TableCell>
              <TableCell>${coin.current_price}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="icon"
                  className="h-10 w-10"
                  variant="ghost"
                  onClick={() => handleRemoveToWatchlist(coin.id)}
                >
                  <Trash2 className="scale-[1.2] text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;
