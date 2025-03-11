import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const coins = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    image:
      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    volume: 23375205316,
    market_cap: 1713774027426,
    price_change_percentage_24h: -1.92269,
    total_price_in_usd: 86424,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    volume: 14151896007,
    market_cap: 268092163777,
    price_change_percentage_24h: 1.98624,
    total_price_in_usd: 2223.6,
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "usdt",
    image:
      "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
    volume: 47997004311,
    market_cap: 142744849538,
    price_change_percentage_24h: -0.01293,
    total_price_in_usd: 0.999609,
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "xrp",
    image:
      "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
    volume: 4295829755,
    market_cap: 136622902656,
    price_change_percentage_24h: -5.18866,
    total_price_in_usd: 2.35,
  },
  {
    id: "binancecoin",
    name: "BNB",
    symbol: "bnb",
    image:
      "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
    volume: 597938090,
    market_cap: 87572885112,
    price_change_percentage_24h: -0.08062,
    total_price_in_usd: 600.55,
  },
];

const Portfolio = () => {
  return (
    <div className="p-5 lg:p-12">
      <h1 className="font-bold text-xl pb-5 text-muted-foreground">Portfolio</h1>
      <Table className="border border-secondary">
        <TableHeader className="bg-secondary">
          <TableRow className="uppercase">
            <TableHead className="w-[100px]">assets</TableHead>
            <TableHead>price</TableHead>
            <TableHead>unit</TableHead>
            <TableHead>change</TableHead>
            <TableHead>change(%)</TableHead>
            <TableHead className="text-right">value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id}>
              <TableCell className="font-medium flex items-center gap-1">
                <Avatar className="-z-50 w-8 h-8">
                  <AvatarImage src={coin.image} />
                  <AvatarFallback>{coin.name}</AvatarFallback>
                </Avatar>
                <span className="ml-2">{coin.name}</span>
              </TableCell>
              <TableCell>{coin.total_price_in_usd}</TableCell>
              <TableCell>{coin.volume}</TableCell>
              <TableCell>{coin.market_cap}</TableCell>
              <TableCell>{coin.price_change_percentage_24h}%</TableCell>
              <TableCell className="text-right">
                ${coin.total_price_in_usd}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
