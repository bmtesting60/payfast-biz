import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "sent" | "received";
  business: string;
  amount: string;
  currency: string;
  status: "completed" | "pending" | "failed";
  date: string;
  time: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "sent",
    business: "Tech Solutions Inc.",
    amount: "5,240.00",
    currency: "USD",
    status: "completed",
    date: "Today",
    time: "2:45 PM"
  },
  {
    id: "2",
    type: "received",
    business: "Global Enterprises",
    amount: "12,800.00",
    currency: "USD",
    status: "completed",
    date: "Today",
    time: "11:20 AM"
  },
  {
    id: "3",
    type: "sent",
    business: "Marketing Pro Ltd",
    amount: "3,500.00",
    currency: "USD",
    status: "pending",
    date: "Yesterday",
    time: "4:15 PM"
  },
  {
    id: "4",
    type: "received",
    business: "Supply Chain Co.",
    amount: "8,920.00",
    currency: "USD",
    status: "completed",
    date: "Yesterday",
    time: "9:30 AM"
  },
];

const TransactionList = () => {
  return (
    <Card className="p-6 shadow-card animate-slide-up">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Recent Transactions</h2>
      <div className="space-y-4">
        {mockTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  transaction.type === "sent"
                    ? "bg-destructive/10"
                    : "bg-success/10"
                )}
              >
                {transaction.type === "sent" ? (
                  <ArrowUpRight className="w-5 h-5 text-destructive" />
                ) : (
                  <ArrowDownLeft className="w-5 h-5 text-success" />
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground">{transaction.business}</p>
                <p className="text-sm text-muted-foreground">
                  {transaction.date} • {transaction.time}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className={cn(
                  "font-bold",
                  transaction.type === "sent" ? "text-foreground" : "text-success"
                )}>
                  {transaction.type === "sent" ? "-" : "+"}
                  {transaction.currency} {transaction.amount}
                </p>
                <Badge
                  variant={
                    transaction.status === "completed"
                      ? "default"
                      : transaction.status === "pending"
                      ? "secondary"
                      : "destructive"
                  }
                  className="mt-1"
                >
                  {transaction.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                  {transaction.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TransactionList;
