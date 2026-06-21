import { useEffect, useState } from 'react';
import axios from 'axios';

function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactions(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshTransactions = () => {
    fetchTransactions();
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, loading, refreshTransactions };
}

export default useTransactions;
