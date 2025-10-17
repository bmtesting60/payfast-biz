import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";

const gateways = [
  { id: "paystack", name: "Paystack", logo: "💳", color: "bg-primary/10 border-primary" },
  { id: "stripe", name: "Stripe", logo: "💵", color: "bg-accent/10 border-accent" },
  { id: "flutterwave", name: "Flutterwave", logo: "🦋", color: "bg-warning/10 border-warning" },
  { id: "paypal", name: "PayPal", logo: "🅿️", color: "bg-secondary/10 border-secondary" },
];

interface PaymentGatewaySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const PaymentGatewaySelector = ({ value, onChange }: PaymentGatewaySelectorProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-foreground font-medium">Payment Gateway</Label>
      <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-2 gap-3">
        {gateways.map((gateway) => (
          <label key={gateway.id} className="cursor-pointer">
            <RadioGroupItem value={gateway.id} id={gateway.id} className="sr-only" />
            <Card
              className={`p-4 border-2 transition-all hover:shadow-md ${
                value === gateway.id
                  ? gateway.color
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{gateway.logo}</span>
                <div>
                  <p className="font-medium text-foreground">{gateway.name}</p>
                  <p className="text-xs text-muted-foreground">Instant processing</p>
                </div>
              </div>
            </Card>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};
