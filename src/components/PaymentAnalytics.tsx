import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, PieChart, TrendingUp, DollarSign } from "lucide-react";
import { useTransactions } from "@/contexts/TransactionContext";

export const PaymentAnalytics = () => {
  const { getAnalytics } = useTransactions();
  const analytics = getAnalytics();

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Payment Analytics
          </CardTitle>
          <CardDescription>Overview of your payment activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-primary rounded-lg text-primary-foreground">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4" />
                <p className="text-sm font-medium">Total Sent</p>
              </div>
              <p className="text-2xl font-bold">${analytics.totalSent.toLocaleString()}</p>
            </div>

            <div className="p-4 bg-gradient-success rounded-lg text-success-foreground">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4" />
                <p className="text-sm font-medium">Total Received</p>
              </div>
              <p className="text-2xl font-bold">${analytics.totalReceived.toLocaleString()}</p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <PieChart className="w-4 h-4 text-foreground" />
                <p className="text-sm font-medium text-foreground">Transactions</p>
              </div>
              <p className="text-2xl font-bold text-foreground">{analytics.totalTransactions}</p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-foreground" />
                <p className="text-sm font-medium text-foreground">Net Balance</p>
              </div>
              <p className="text-2xl font-bold text-foreground">
                ${(analytics.totalReceived - analytics.totalSent).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">By Payment Gateway</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(analytics.byGateway).map(([gateway, count]) => (
              <div key={gateway} className="flex items-center justify-between">
                <span className="text-foreground capitalize">{gateway}</span>
                <Badge variant="secondary">{count} transactions</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">By Currency</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(analytics.byCurrency).map(([currency, count]) => (
              <div key={currency} className="flex items-center justify-between">
                <span className="text-foreground">{currency}</span>
                <Badge variant="outline">{count} transactions</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
