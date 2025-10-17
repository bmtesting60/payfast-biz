import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const InvoiceGenerator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    clientName: "",
    amount: "",
    description: "",
    dueDate: "",
  });

  const handleGenerate = () => {
    if (!formData.clientName || !formData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in client name and amount",
        variant: "destructive",
      });
      return;
    }

    const invoiceId = `INV-${Date.now()}`;
    toast({
      title: "Invoice Generated",
      description: `Invoice ${invoiceId} created successfully`,
    });

    // Reset form
    setFormData({ clientName: "", amount: "", description: "", dueDate: "" });
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Invoice Generator
            </CardTitle>
            <CardDescription>Create professional invoices instantly</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            placeholder="Enter client name"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Services or products description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleGenerate} className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            Generate Invoice
          </Button>
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
