import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AssetsTable = ({ coins, category }) => {
  const navigate = useNavigate();
  return (
    <Table className="border border-secondary">
      <ScrollArea
        className={category === "all" ? "h-[74vh] p-3" : "h-[82vh] p-3"}
      >
        <TableHeader className="bg-secondary">
          <TableRow className="uppercase">
            <TableHead className="w-[100px]">coin</TableHead>
            <TableHead>symbol</TableHead>
            <TableHead>volume</TableHead>
            <TableHead>market cap</TableHead>
            <TableHead>24hrs</TableHead>
            <TableHead className="text-right">price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow
              key={coin.id}
              className="cursor-pointer"
              onClick={() => navigate(`/market/${coin.id}`)}
            >
              <TableCell className="font-medium flex items-center gap-1">
                <Avatar className="-z-50 w-8 h-8">
                  <AvatarImage src={coin.image} />
                  <AvatarFallback>{coin.name}</AvatarFallback>
                </Avatar>
                <span className="ml-2">{coin.name}</span>
              </TableCell>
              <TableCell>{coin.symbol}</TableCell>
              <TableCell>{coin.total_volume}</TableCell>
              <TableCell>{coin.market_cap}</TableCell>
              <TableCell>{coin.price_change_percentage_24h}%</TableCell>
              <TableCell className="text-right">
                ${" "}{coin.current_price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ScrollArea>
    </Table>
  );
};

export default AssetsTable;

AssetsTable.propTypes = {
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      total_volume: PropTypes.number,
      market_cap: PropTypes.number,
      price_change_percentage_24h: PropTypes.number,
      current_price: PropTypes.number,
      image: PropTypes.string,
    })
  ).isRequired,
  category: PropTypes.string.isRequired,
};
