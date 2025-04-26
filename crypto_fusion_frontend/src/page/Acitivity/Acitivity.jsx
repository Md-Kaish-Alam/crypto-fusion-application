import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateProfite, readableDate } from "@/lib/utils";
import { getAllOrdersForUser } from "@/store/Order/OrderAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Acitivity = () => {
  const dispatch = useDispatch();

  const { order } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

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
          {order.orders?.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell>
                <p>{readableDate(asset.timestamp).date}</p>
                <p className="text-muted-foreground">
                  {readableDate(asset.timestamp).time}
                </p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-1">
                <Avatar className="-z-50 w-8 h-8">
                  <AvatarImage src={asset.orderItem.coin.image} />
                  <AvatarFallback>{asset.orderItem.coin.symbol}</AvatarFallback>
                </Avatar>
                <span className="ml-2">{asset.orderItem.coin.name}</span>
              </TableCell>
              <TableCell>$ {asset.orderItem.buyPrice}</TableCell>
              <TableCell>{"$ " + asset.orderItem.sellPrice || "-"}</TableCell>
              <TableCell
                className={`${
                  asset.orderType == "BUY" ? "text-green-600" : "text-red-600"
                }`}
              >
                {asset.orderType}
              </TableCell>
              <TableCell
                className={`${
                  calculateProfite(asset) < 0 ? "text-red-600" : ""
                }`}
              >
                {asset.orderType == "SELL" ? calculateProfite(asset) : "-"}
              </TableCell>
              <TableCell className="text-right">$ {asset.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Acitivity;
