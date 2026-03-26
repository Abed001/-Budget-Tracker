import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


// Import Jules components
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar';
import MetricsGrid from '../components/MetricsGrid';
import FinancialChart from '../components/FinancialChart';
import TransactionForm from '../components/TransactionForm';
import RecentLedgerList from '../components/RecentLedgerList';
import AllocationDonut from '../components/AllocationDonut';

function Dashboard() {
  const { user, setUser, isAuthenticated } = useAuth()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate metrics from real transaction data
  const calculateMetrics = () => {
    const totalBalance = transactions.reduce((sum, t) => {
      return t.type === 'income' ? sum + t.amount : sum - t.amount
    }, 0);

    const monthlyIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { totalBalance, monthlyIncome, monthlyExpenses };
  };

  const metrics = calculateMetrics();

  useEffect(() => {
    // Fetch real transactions from your backend
    axios.get('http://localhost:3001/api/transactions')
      .then(response => {
        console.log("Backend Data Received:", response.data)
        setTransactions(response.data)
      })
      .catch(error => console.error("Bridge Error:", error))
  }, [])

  const logout = () => {
    setLoading(true);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast("✅ Logging Out...");
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  // Pass real data to Jules components
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary/30 min-h-screen flex">
      <Sidebar onLogout={logout} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar user={user} loading={loading} />

        <main className="mt-20 p-8 flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
          {/* Pass real metrics to MetricsGrid */}
          <MetricsGrid
            totalBalance={metrics.totalBalance}
            monthlyIncome={metrics.monthlyIncome}
            monthlyExpenses={metrics.monthlyExpenses}
          />

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FinancialChart transactions={transactions} />
            <TransactionForm onTransactionAdded={() => {
              // Refresh transactions after adding new one
              axios.get('http://localhost:3001/api/transactions')
                .then(response => setTransactions(response.data));
            }} />
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 md:mb-0">
            <RecentLedgerList transactions={transactions} />
            <AllocationDonut
              income={metrics.monthlyIncome}
              expenses={metrics.monthlyExpenses}
            />
          </section>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-container-high/90 backdrop-blur-xl border-t border-outline-variant/10 flex items-center justify-around z-50">
        <button className="text-primary flex flex-col items-center">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>
        <button className="text-primary/40 flex flex-col items-center">
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="text-[10px] font-medium mt-1">History</span>
        </button>
        <div className="bg-primary p-3 rounded-full -translate-y-6 shadow-lg shadow-primary/30 border-4 border-surface">
          <span className="material-symbols-outlined text-on-primary">add</span>
        </div>
        <button className="text-primary/40 flex flex-col items-center">
          <span className="material-symbols-outlined">insights</span>
          <span className="text-[10px] font-medium mt-1">Charts</span>
        </button>
        <button className="text-primary/40 flex flex-col items-center">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-medium mt-1">Profile</span>
        </button>
      </nav>

      <ToastContainer position="top-right" hideProgressBar={true} autoClose={2000} />
    </div>
  )
}

export default Dashboard