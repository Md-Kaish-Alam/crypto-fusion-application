import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/Loading";
import { readableTimestamp } from "@/lib/utils";
import { getWithdrawalHistory } from "@/store/Withdrawal/WithdrawalAction";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getWithdrawalHistory(jwt));
    }
  }, [dispatch]);

  if (withdrawal?.history?.length === 0) {
    return (
      <div className="p-5 lg:p-12">
        <h1 className="font-bold text-xl pb-5 text-muted-foreground">
          Withdrawals
        </h1>
        <p className="text-muted-foreground">No withdrawals found.</p>
      </div>
    );
  }

  if (withdrawal?.loading) {
    return <Loading />;
  }

  return (
    <div className="p-5 lg:p-12">
      <h1 className="font-bold text-xl pb-5 text-muted-foreground">
        Withdrawals
      </h1>
      <Table className="border border-secondary">
        <TableHeader className="bg-secondary">
          <TableRow className="uppercase">
            <TableHead>date & time</TableHead>
            <TableHead>method</TableHead>
            <TableHead>amount</TableHead>
            <TableHead className="text-right">status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawal.history?.map((withdrawal, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <p>{readableTimestamp(withdrawal?.date)}</p>
                <p className="text-muted-foreground"></p>
              </TableCell>
              <TableCell>Bank Account</TableCell>
              <TableCell>{withdrawal?.amount}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`text-white ${
                    withdrawal.status === "PENDING"
                      ? "bg-yellow-500"
                      : withdrawal.status === "DECLINED"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {withdrawal?.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Withdrawal;
