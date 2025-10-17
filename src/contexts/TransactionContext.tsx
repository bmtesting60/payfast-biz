import { createContext, useContext, useState, ReactNode } from "react";

export interface Transaction {
  id: string;
  type: "sent" | "received";
  business: string;
  amount: string;
  currency: string;
  status: "completed" | "pending" | "failed";
  date: string;
  time: string;
  reference?: string;
  gateway?: "paystack" | "stripe" | "flutterwave" | "paypal";
  invoiceId?: string;
  isRecurring?: boolean;
  recurringFrequency?: "daily" | "weekly" | "monthly" | "yearly";
  paymentLink?: string;
  refundable?: boolean;
  refundedAmount?: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id" | "date" | "time" | "status">) => void;
  updateTransactionStatus: (id: string, status: Transaction["status"]) => void;
  refundTransaction: (id: string, amount: string) => void;
  clearTransactions: () => void;
  getAnalytics: () => {
    totalSent: number;
    totalReceived: number;
    totalTransactions: number;
    byGateway: Record<string, number>;
    byCurrency: Record<string, number>;
    byStatus: Record<string, number>;
  };
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "sent",
    business: "Tech Solutions Inc.",
    amount: "5,240.00",
    currency: "USD",
    status: "completed",
    date: "Today",
    time: "2:45 PM",
    reference: "TXN-2024-001",
    gateway: "paystack",
    refundable: true
  },
  {
    id: "2",
    type: "received",
    business: "Global Enterprises",
    amount: "12,800.00",
    currency: "USD",
    status: "completed",
    date: "Today",
    time: "11:20 AM",
    reference: "TXN-2024-002",
    gateway: "stripe",
    invoiceId: "INV-2024-002"
  },
  {
    id: "3",
    type: "sent",
    business: "Marketing Pro Ltd",
    amount: "3,500.00",
    currency: "EUR",
    status: "pending",
    date: "Yesterday",
    time: "4:15 PM",
    reference: "TXN-2024-003",
    gateway: "flutterwave",
    isRecurring: true,
    recurringFrequency: "monthly"
  },
  {
    id: "4",
    type: "received",
    business: "Supply Chain Co.",
    amount: "8,920.00",
    currency: "GBP",
    status: "completed",
    date: "Yesterday",
    time: "9:30 AM",
    reference: "TXN-2024-004",
    gateway: "paypal",
    refundable: true
  },
];

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const addTransaction = (transaction: Omit<Transaction, "id" | "date" | "time" | "status">) => {
    const now = new Date();
    const newTransaction: Transaction = {
      ...transaction,
      id: `TXN-${Date.now()}`,
      date: "Today",
      time: now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      status: "pending",
      reference: `REF-${Date.now()}`
    };

    setTransactions((prev) => [newTransaction, ...prev]);

    // Simulate processing: mark as completed after 2 seconds
    setTimeout(() => {
      updateTransactionStatus(newTransaction.id, "completed");
    }, 2000);
  };

  const updateTransactionStatus = (id: string, status: Transaction["status"]) => {
    setTransactions((prev) =>
      prev.map((txn) => (txn.id === id ? { ...txn, status } : txn))
    );
  };

  const refundTransaction = (id: string, amount: string) => {
    setTransactions((prev) =>
      prev.map((txn) =>
        txn.id === id
          ? { ...txn, refundedAmount: amount, status: "completed" as const }
          : txn
      )
    );
  };

  const clearTransactions = () => {
    setTransactions([]);
  };

  const getAnalytics = () => {
    const totalSent = transactions
      .filter((t) => t.type === "sent" && t.status === "completed")
      .reduce((sum, t) => sum + parseFloat(t.amount.replace(/,/g, "")), 0);
    
    const totalReceived = transactions
      .filter((t) => t.type === "received" && t.status === "completed")
      .reduce((sum, t) => sum + parseFloat(t.amount.replace(/,/g, "")), 0);
    
    const byGateway: Record<string, number> = {};
    const byCurrency: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    
    transactions.forEach((t) => {
      if (t.gateway) byGateway[t.gateway] = (byGateway[t.gateway] || 0) + 1;
      byCurrency[t.currency] = (byCurrency[t.currency] || 0) + 1;
      byStatus[t.status] = (byStatus[t.status] || 0) + 1;
    });

    return {
      totalSent,
      totalReceived,
      totalTransactions: transactions.length,
      byGateway,
      byCurrency,
      byStatus,
    };
  };

  return (
    <TransactionContext.Provider
      value={{ 
        transactions, 
        addTransaction, 
        updateTransactionStatus, 
        refundTransaction,
        clearTransactions,
        getAnalytics
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within TransactionProvider");
  }
  return context;
};
