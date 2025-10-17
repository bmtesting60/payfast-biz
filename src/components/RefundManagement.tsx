import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { AlertCircle, DollarSign } from "lucide-react";
import { useTransactions } from "@/contexts/TransactionContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const RefundManagement = () => {
  const { transactions, refundTransaction } = useTransactions();
  const { toast } = useToast();
  const [refundAmount, setRefundAmount] = useState("");
  const [selectedTxn, setSelectedTxn] = useState<string | null>(null);

  const refundableTransactions = transactions.filter(
    (t) => t.refundable && t.status === "completed" && !t.refundedAmount
  );

  const handleRefund = (txnId: string) => {
    if (!refundAmount) {
      toast({
        title: "Missing Amount",
        description: "Please enter refund amount",
        variant: "destructive",
      });
      return;
    }

    refundTransaction(txnId, refundAmount);
    toast({
      title: "Refund Processed",
      description: `Refund of $${refundAmount} has been initiated`,
    });
    setRefundAmount("");
    setSelectedTxn(null);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-warning" />
          Refund Management
        </CardTitle>
        <CardDescription>Process refunds for completed transactions</CardDescription>
      </CardHeader>
      <CardContent>
        {refundableTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No refundable transactions available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {refundableTransactions.map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground">{txn.business}</p>
                    <Badge variant="outline" className="text-xs">
                      {txn.gateway}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{txn.reference}</p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {txn.currency} {txn.amount}
                  </p>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedTxn(txn.id)}>
                      Process Refund
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Process Refund</DialogTitle>
                      <DialogDescription>
                        Enter the refund amount for transaction {txn.reference}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="refund-amount">Refund Amount</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="refund-amount"
                              type="number"
                              placeholder="0.00"
                              className="pl-9"
                              value={refundAmount}
                              onChange={(e) => setRefundAmount(e.target.value)}
                              max={parseFloat(txn.amount.replace(/,/g, ""))}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Maximum: {txn.currency} {txn.amount}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleRefund(txn.id)}
                        className="w-full"
                        variant="destructive"
                      >
                        Confirm Refund
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
