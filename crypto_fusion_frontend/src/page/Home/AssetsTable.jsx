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
  {
    id: "solana",
    name: "Solana",
    symbol: "sol",
    image:
      "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
    volume: 3581633330,
    market_cap: 70418449082,
    price_change_percentage_24h: -6.08737,
    total_price_in_usd: 138.31,
  },
  {
    id: "usd-coin",
    name: "USDC",
    symbol: "usdc",
    image:
      "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
    volume: 6487633524,
    market_cap: 58114326330,
    price_change_percentage_24h: 0.00713,
    total_price_in_usd: 0.999862,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ada",
    image:
      "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090",
    market_cap: 29395590529,
    price_change_percentage_24h: -4.30721,
    total_price_in_usd: 0.818131,
    volume: 1495624408,
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "doge",
    image:
      "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
    market_cap: 28902415008,
    price_change_percentage_24h: -5.22481,
    total_price_in_usd: 0.194933,
    volume: 1126545066,
  },
  {
    id: "tron",
    name: "TRON",
    symbol: "trx",
    image:
      "https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193",
    market_cap: 21126450586,
    price_change_percentage_24h: 0.16606,
    total_price_in_usd: 0.245644,
    volume: 830872218,
  },
  {
    id: "staked-ether",
    name: "Lido Staked Ether",
    symbol: "steth",
    image:
      "https://coin-images.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
    market_cap: 20745155874,
    price_change_percentage_24h: 1.87375,
    total_price_in_usd: 2221.21,
    volume: 41316236,
  },
  {
    id: "pi-network",
    name: "Pi Network",
    symbol: "pi",
    image:
      "https://coin-images.coingecko.com/coins/images/54342/large/pi_network.jpg?1739347576",
    market_cap: 11911342920,
    price_change_percentage_24h: -8.50054,
    total_price_in_usd: 1.65,
    volume: 299705463,
  },
  {
    id: "wrapped-bitcoin",
    name: "Wrapped Bitcoin",
    symbol: "wbtc",
    image:
      "https://coin-images.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1696507857",
    market_cap: 11113227013,
    price_change_percentage_24h: -2.10619,
    total_price_in_usd: 86120,
    volume: 259548007,
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "link",
    image:
      "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009",
    market_cap: 9892677631,
    price_change_percentage_24h: -7.01515,
    total_price_in_usd: 15.51,
    volume: 659535106,
  },
  {
    id: "hedera-hashgraph",
    name: "Hedera",
    symbol: "hbar",
    image:
      "https://coin-images.coingecko.com/coins/images/3688/large/hbar.png?1696504364",
    market_cap: 9631132953,
    price_change_percentage_24h: -4.78142,
    total_price_in_usd: 0.228241,
    volume: 315291302,
  },
  {
    id: "wrapped-steth",
    name: "Wrapped stETH",
    symbol: "wsteth",
    image:
      "https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295",
    market_cap: 9193694522,
    price_change_percentage_24h: 1.22481,
    total_price_in_usd: 2645.96,
    volume: 27821889,
  },
  {
    id: "leo-token",
    name: "LEO Token",
    symbol: "leo",
    image:
      "https://coin-images.coingecko.com/coins/images/8418/large/leo-token.png?1696508607",
    market_cap: 9112511080,
    price_change_percentage_24h: -0.53719,
    total_price_in_usd: 9.87,
    volume: 2200392,
  },
];


const AssetsTable = () => {
  return (
    <Table>
      <TableHeader>
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
          <TableRow key={coin.id}>
            <TableCell className="font-medium flex items-center gap-1">
              <Avatar className="-z-50 w-8 h-8">
                <AvatarImage src={coin.image} />
                <AvatarFallback>{coin.name}</AvatarFallback>
              </Avatar>
              <span className="ml-2">{coin.name}</span>
            </TableCell>
            <TableCell>{coin.symbol}</TableCell>
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
  );
};

export default AssetsTable;
