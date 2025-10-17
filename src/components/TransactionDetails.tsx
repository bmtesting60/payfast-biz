import { Transaction } from "@/contexts/TransactionContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, ArrowDownLeft, Download, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TransactionDetailsProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TransactionDetails = ({ transaction, open, onOpenChange }: TransactionDetailsProps) => {
  if (!transaction) return null;

  const copyReference = () => {
    navigator.clipboard.writeText(transaction.reference || transaction.id);
    toast.success("Reference copied to clipboard");
  };

  const downloadReceipt = () => {
    toast.success("Receipt downloaded successfully");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                transaction.type === "sent" ? "bg-destructive/10" : "bg-success/10"
              )}
            >
              {transaction.type === "sent" ? (
                <ArrowUpRight className="w-5 h-5 text-destructive" />
              ) : (
                <ArrowDownLeft className="w-5 h-5 text-success" />
              )}
            </div>
            Transaction Details
          </DialogTitle>
          <DialogDescription>
            Reference: {transaction.reference || transaction.id}
          </DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 py-4"
        >
          {/* Amount Section */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {transaction.type === "sent" ? "Amount Sent" : "Amount Received"}
            </p>
            <p className={cn(
              "text-4xl font-bold",
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
            >
              {transaction.status}
            </Badge>
          </div>

          <Separator />

          {/* Transaction Info */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Business</span>
              <span className="font-semibold">{transaction.business}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="font-semibold">{transaction.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time</span>
              <span className="font-semibold">{transaction.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type</span>
              <span className="font-semibold capitalize">{transaction.type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Reference</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs">{transaction.reference || transaction.id}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyReference}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={downloadReceipt} className="flex-1" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetails;
