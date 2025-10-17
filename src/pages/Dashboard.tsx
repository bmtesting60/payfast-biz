import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import PaymentForm from "@/components/PaymentForm";
import TransactionList from "@/components/TransactionList";
import { InvoiceGenerator } from "@/components/InvoiceGenerator";
import { PaymentLinkGenerator } from "@/components/PaymentLinkGenerator";
import { RecurringPaymentSetup } from "@/components/RecurringPaymentSetup";
import { PaymentAnalytics } from "@/components/PaymentAnalytics";
import { RefundManagement } from "@/components/RefundManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Manage your business payments in real-time</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Account Balance"
                value="$124,582"
                icon={DollarSign}
                trend="+12.5% from last month"
                trendUp={true}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Total Sent"
                value="$89,420"
                icon={TrendingUp}
                trend="32 transactions"
                trendUp={true}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Total Received"
                value="$156,800"
                icon={Activity}
                trend="48 transactions"
                trendUp={true}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Active Partners"
                value="127"
                icon={Users}
                trend="+8 this week"
                trendUp={true}
              />
            </motion.div>
          </motion.div>

          {/* Main Content with Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Tabs defaultValue="payments" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="refunds">Refunds</TabsTrigger>
              </TabsList>

              <TabsContent value="payments" className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <PaymentForm />
                  </div>
                  <div className="lg:col-span-2">
                    <TransactionList />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <PaymentAnalytics />
              </TabsContent>

              <TabsContent value="tools" className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <InvoiceGenerator />
                  <PaymentLinkGenerator />
                  <RecurringPaymentSetup />
                </div>
              </TabsContent>

              <TabsContent value="refunds">
                <RefundManagement />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
