// useMetrics.js
const useMetrics = (transactions) => {
  // Handle empty or undefined transactions
  if (!transactions || transactions.length === 0) {
    return {
      totalBalance: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0,
    };
  }

  const totalBalance = transactions.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount;
  }, 0);

  const monthlyIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return { totalBalance, monthlyIncome, monthlyExpenses };
};

export default useMetrics;
