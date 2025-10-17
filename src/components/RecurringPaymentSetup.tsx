import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CalendarClock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RecurringPaymentSetup = () => {
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(false);
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
    frequency: "monthly",
    startDate: "",
  });

  const handleSetup = () => {
    if (!formData.recipient || !formData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in recipient and amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Recurring Payment Setup",
      description: `${formData.frequency} payment of $${formData.amount} to ${formData.recipient}`,
    });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarClock className="w-5 h-5 text-secondary" />
          Recurring Payments
        </CardTitle>
        <CardDescription>Set up automatic recurring payments</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="recurring-enabled">Enable Recurring Payments</Label>
          <Switch
            id="recurring-enabled"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>

        {enabled && (
          <>
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="Recipient name or email"
                value={formData.recipient}
                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recurring-amount">Amount</Label>
              <Input
                id="recurring-amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData({ ...formData, frequency: value })}
              >
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            <Button onClick={handleSetup} className="w-full">
              Setup Recurring Payment
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
