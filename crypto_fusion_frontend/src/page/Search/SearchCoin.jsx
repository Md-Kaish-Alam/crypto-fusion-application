import { useState } from "react";
import { Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchCoin } from "@/store/Coin/CoinAction";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const SearchCoin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState();

  const { coin } = useSelector((state) => state);

  const handleSearchCoin = () => {
    dispatch(searchCoin(keyword));
  };

  return (
    <div className="p-10 lg:p=[50%]">
      <div className="flex coins-center justify-center pb-16">
        <Input
          className="p-5 w-[90%] lg:w-[50%] rounded-r-none "
          placeholder="Explore Market..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={handleSearchCoin} className="p-5 rounded-l-none">
          <Search />
        </Button>
      </div>
      <Table className="px-5  relative">
        <TableHeader className="py-9">
          <TableRow className="sticky top-0 left-0 right-0 bg-background uppercase">
            <TableHead className="py-3">Market Cap Rank</TableHead>
            <TableHead>Treading Pair</TableHead>
            <TableHead className="text-right">symbol</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {coin.searchCoinList?.map((coin) => (
            <TableRow
              onClick={() => navigate(`/market/${coin.id}`)}
              key={coin.id}
              className="cursor-pointer"
            >
              <TableCell>
                <p className="">{coin.market_cap_rank}</p>
              </TableCell>
              <TableCell className="font-medium flex coins-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage src={coin.large} alt={coin.symbol} />
                </Avatar>
                <span>{coin.name}</span>
              </TableCell>
              <TableCell className="text-right">{coin.symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SearchCoin;
