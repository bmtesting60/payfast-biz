import { DollarSign, TrendingUp, Users, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import PaymentForm from "@/components/PaymentForm";
import TransactionList from "@/components/TransactionList";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your business payments in real-time</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Account Balance"
              value="$124,582"
              icon={DollarSign}
              trend="+12.5% from last month"
              trendUp={true}
            />
            <StatsCard
              title="Total Sent"
              value="$89,420"
              icon={TrendingUp}
              trend="32 transactions"
              trendUp={true}
            />
            <StatsCard
              title="Total Received"
              value="$156,800"
              icon={Activity}
              trend="48 transactions"
              trendUp={true}
            />
            <StatsCard
              title="Active Partners"
              value="127"
              icon={Users}
              trend="+8 this week"
              trendUp={true}
            />
          </div>

          {/* Payment Form and Transactions */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <PaymentForm />
            </div>
            <div className="lg:col-span-2">
              <TransactionList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
