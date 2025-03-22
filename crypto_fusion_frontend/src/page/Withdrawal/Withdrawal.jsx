import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const withdrawals = [
  {
    date: "Jun 2, 2024",
    time: "14:30",
    method: "Bank Account",
    amount: "$50",
    status: "SUCCESS",
  },
  {
    date: "Jun 5, 2024",
    time: "10:15",
    method: "Card",
    amount: "$20",
    status: "PENDING",
  },
  {
    date: "Jun 8, 2024",
    time: "18:45",
    method: "UPI",
    amount: "$15",
    status: "SUCCESS",
  },
  {
    date: "Jun 10, 2024",
    time: "08:50",
    method: "Bank Account",
    amount: "$30",
    status: "SUCCESS",
  },
  {
    date: "Jun 12, 2024",
    time: "22:10",
    method: "UPI",
    amount: "$25",
    status: "PENDING",
  },
];

const Withdrawal = () => {
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
          {withdrawals.map((withdrawal, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <p>
                  {withdrawal.date} at {withdrawal.time}
                </p>
                <p className="text-muted-foreground"></p>
              </TableCell>
              <TableCell>{withdrawal.method}</TableCell>
              <TableCell>{withdrawal.amount}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`text-white ${
                    withdrawal.status == "PENDING"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {withdrawal.status}
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
