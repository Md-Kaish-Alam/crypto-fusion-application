import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const coins = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    image:
      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    date: "2025/03/13",
    time: "14:30:15",
    buy_price: 85000,
    sell_price: 86424,
    order_type: "BUY",
    profit_loss: "+4613.32",
    value: 643.45,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    date: "2025/03/13",
    time: "14:32:10",
    buy_price: 2250,
    sell_price: 2223.6,
    order_type: "SELL",
    profit_loss: "-5646.65",
    value: 712.98,
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "usdt",
    image:
      "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
    date: "2025/03/13",
    time: "14:35:50",
    buy_price: 1.0,
    sell_price: 0.999609,
    order_type: "SELL",
    profit_loss: "-0.0004",
    value: 1000,
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "xrp",
    image:
      "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
    date: "2025/03/13",
    time: "14:40:22",
    buy_price: 2.4,
    sell_price: 2.35,
    order_type: "SELL",
    profit_loss: "-0.05",
    value: 500,
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "bnb",
    image:
      "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
    date: "2025/03/13",
    time: "14:45:05",
    buy_price: 590.0,
    sell_price: 600.55,
    order_type: "BUY",
    profit_loss: "+10.55",
    value: 250,
  },
];

const Acitivity = () => {
  return (
    <div className="p-5 lg:p-12">
      <h1 className="font-bold text-xl pb-5 text-muted-foreground">Activity</h1>
      <Table className="border border-secondary">
        <TableHeader className="bg-secondary">
          <TableRow className="uppercase">
            <TableHead>date & time</TableHead>
            <TableHead>trading pair</TableHead>
            <TableHead>buy price</TableHead>
            <TableHead>sell price</TableHead>
            <TableHead>order type</TableHead>
            <TableHead>profit/loss</TableHead>
            <TableHead className="text-right">value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id}>
              <TableCell>
                <p>{coin.date}</p>
                <p className="text-muted-foreground">{coin.time}</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-1">
                <Avatar className="-z-50 w-8 h-8">
                  <AvatarImage src={coin.image} />
                  <AvatarFallback>{coin.name}</AvatarFallback>
                </Avatar>
                <span className="ml-2">{coin.name}</span>
              </TableCell>
              <TableCell>${coin.buy_price}</TableCell>
              <TableCell>${coin.sell_price}</TableCell>
              <TableCell>{coin.order_type}</TableCell>
              <TableCell className={`${(coin.profit_loss < 0) ? "text-red-600" : ""}`}>{coin.profit_loss}</TableCell>
              <TableCell className="text-right">${coin.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Acitivity;
