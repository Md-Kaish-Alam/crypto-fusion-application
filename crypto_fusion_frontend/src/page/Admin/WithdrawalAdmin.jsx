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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getAllWithdrawalRequest,
  proceedWithdrawal,
} from "@/store/Withdrawal/WithdrawalAction";
import { toast } from "@/hooks/use-toast";
import Loading from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { readableTimestamp } from "@/lib/utils";

const WithdrawalAdmin = () => {
  const dispatch = useDispatch();

  const { withdrawal } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllWithdrawalRequest(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleProccedWithdrawal = (id, accept) => {
    dispatch(
      proceedWithdrawal({ jwt: localStorage.getItem("jwt"), id, accept })
    );
    toast({
      title: accept ? "Withdrawal Accepted" : "Withdrawal Declined",
      description: `You have successfully ${
        accept ? "accepted" : "declined"
      } the withdrawal request.`,
      duration: 3000,
    });
  };

  if (withdrawal?.requests?.length === 0) {
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
    <div className="px-20 ">
      <h1 className="text-3xl font-bold py-10">All Withdrawal Requests</h1>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-5">Date</TableHead>
              <TableHead className="py-5">User</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Procced</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawal.requests?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium py-5">
                  {readableTimestamp(item?.date)}
                </TableCell>
                <TableCell>
                  <p className="font-bold">{item.user.fullName}</p>
                  <p className="text-gray-300">{item.user.email}</p>
                </TableCell>
                <TableCell>{"Bank Account"}</TableCell>
                <TableCell className="text-green-500">
                  {item.amount} USD
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`text-white ${
                      item.status === "PENDING"
                        ? "bg-yellow-500"
                        : item.status === "DECLINED"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className=" outline-none ">
                      <Button variant="outline">PROCCED</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="">
                        <Button
                          onClick={() => handleProccedWithdrawal(item.id, true)}
                          className="w-full bg-green-500 text-white hover:text-black"
                        >
                          Acceppt
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          onClick={() =>
                            handleProccedWithdrawal(item.id, false)
                          }
                          className="w-full bg-red-500 text-white hover:text-black"
                        >
                          Decline
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WithdrawalAdmin;
