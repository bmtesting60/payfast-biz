import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PaymentLinkGenerator = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!amount) {
      toast({
        title: "Missing Amount",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    const linkId = Math.random().toString(36).substr(2, 9);
    const link = `${window.location.origin}/pay/${linkId}`;
    setGeneratedLink(link);

    toast({
      title: "Payment Link Generated",
      description: "Share this link to receive payments",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Payment link copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="w-5 h-5 text-accent" />
          Payment Link Generator
        </CardTitle>
        <CardDescription>Create shareable payment links</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="link-amount">Amount</Label>
          <Input
            id="link-amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="link-description">Description (Optional)</Label>
          <Input
            id="link-description"
            placeholder="What's this payment for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button onClick={handleGenerate} className="w-full">
          <Link className="w-4 h-4 mr-2" />
          Generate Payment Link
        </Button>

        {generatedLink && (
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <Label>Your Payment Link</Label>
            <div className="flex gap-2">
              <Input value={generatedLink} readOnly className="bg-background" />
              <Button onClick={handleCopy} size="icon" variant="outline">
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
