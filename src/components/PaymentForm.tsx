import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTransactions } from "@/contexts/TransactionContext";
import { PaymentGatewaySelector } from "./PaymentGatewaySelector";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [gateway, setGateway] = useState("paystack");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTransaction } = useTransactions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !recipient) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    // Add transaction to the list
    addTransaction({
      type: "sent",
      business: recipient,
      amount: parseFloat(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      currency: currency,
      gateway: gateway as "paystack" | "stripe" | "flutterwave" | "paypal",
      isRecurring: isRecurring,
      recurringFrequency: isRecurring ? "monthly" : undefined,
      refundable: true,
    });

    toast.success("Payment sent successfully!", {
      description: `${currency} ${amount} sent to ${recipient} via ${gateway}`,
    });

    setTimeout(() => {
      setAmount("");
      setRecipient("");
      setGateway("paystack");
      setIsRecurring(false);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 shadow-card">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Quick Send Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Business</Label>
            <Input
              id="recipient"
              placeholder="Enter business name or account"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency" className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="NGN">NGN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <PaymentGatewaySelector value={gateway} onChange={setGateway} />

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="recurring">Recurring Payment</Label>
              <p className="text-xs text-muted-foreground">Setup automatic monthly payments</p>
            </div>
            <Switch
              id="recurring"
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
            />
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
              disabled={isSubmitting}
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Processing..." : "Send Payment"}
            </Button>
          </motion.div>
        </form>
      </Card>
    </motion.div>
  );
};

export default PaymentForm;
