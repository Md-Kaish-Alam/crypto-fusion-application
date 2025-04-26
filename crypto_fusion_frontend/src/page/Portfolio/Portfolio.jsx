import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserAssets } from "@/store/Asset/AssetAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { asset } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, [dispatch]);

  return (
    <div className="p-5 lg:p-12">
      <h1 className="font-bold text-xl pb-5 text-muted-foreground">
        Portfolio
      </h1>
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
          {asset.userAssets?.map((asset) => (
            <TableRow
              key={asset.id}
              onClick={() => navigate(`/market/${asset?.coin.id}`)}
            >
              <TableCell className="font-medium flex items-center gap-1">
                <Avatar className="-z-50 w-8 h-8">
                  <AvatarImage src={asset?.coin?.image} />
                  <AvatarFallback>{asset?.coin?.symbol}</AvatarFallback>
                </Avatar>
                <span className="ml-2">{asset?.coin?.name}</span>
              </TableCell>
              <TableCell>$ {asset?.coin?.current_price}</TableCell>
              <TableCell>{asset?.quantity}</TableCell>
              <TableCell
                className={`${
                  asset?.coin?.price_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {asset?.coin?.price_change_24h}
              </TableCell>
              <TableCell
                className={`${
                  asset?.coin?.price_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {asset?.coin?.price_change_percentage_24h}%
              </TableCell>
              <TableCell className="text-right">
                $ {asset?.coin?.current_price * asset?.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Portfolio;
