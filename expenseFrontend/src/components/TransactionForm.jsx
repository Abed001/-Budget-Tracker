import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TransactionForm = ({ onTransactionAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'expense',
        category: 'general',
        date: new Date().toISOString().split('T')[0]
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await axios.post('http://localhost:3001/api/transactions', {
                ...formData,
                amount: parseFloat(formData.amount)
            });

            toast.success("Transaction added successfully!");
            setFormData({
                title: '',
                amount: '',
                type: 'expense',
                category: 'general',
                date: new Date().toISOString().split('T')[0]
            });

            if (onTransactionAdded) onTransactionAdded();

        } catch (error) {
            console.error("Error adding transaction:", error);
            toast.error("Failed to add transaction");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
            <h3 className="text-xl font-bold text-on-surface mb-6">Quick Register</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-xs font-semibold text-on-surface-variant/60 uppercase tracking-wider mb-2 font-label">
                        Transaction Title
                    </label>
                    <input
                        className="w-full bg-surface-container-highest border-none rounded-md px-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-2 focus:ring-primary/50 outline-none"
                        placeholder="e.g., Salary, Groceries, etc."
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-on-surface-variant/60 uppercase tracking-wider mb-2 font-label">
                        Amount
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold">$</span>
                        <input
                            className="w-full bg-surface-container-highest border-none rounded-md pl-8 pr-4 py-3 text-on-surface placeholder:text-on-surface-variant/30 focus:ring-2 focus:ring-primary/50 text-xl font-headline outline-none"
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-on-surface-variant/60 uppercase tracking-wider mb-2 font-label">
                        Classification
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            className={`flex items-center justify-center gap-2 py-3 rounded-md border transition-all active:scale-95 ${formData.type === 'income' ? 'border-secondary text-secondary bg-secondary/5 font-medium' : 'border-outline-variant/30 text-on-surface-variant'}`}
                            onClick={() => setFormData({ ...formData, type: 'income' })}
                        >
                            <span className="material-symbols-outlined text-sm">arrow_upward</span>
                            Income
                        </button>
                        <button
                            type="button"
                            className={`flex items-center justify-center gap-2 py-3 rounded-md transition-all active:scale-95 ${formData.type === 'expense' ? 'bg-tertiary-container text-on-tertiary-container font-medium shadow-lg shadow-tertiary/20' : 'border border-outline-variant/30 text-on-surface-variant'}`}
                            onClick={() => setFormData({ ...formData, type: 'expense' })}
                        >
                            <span className="material-symbols-outlined text-sm">arrow_downward</span>
                            Expense
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-on-surface-variant/60 uppercase tracking-wider mb-2 font-label">
                        Date
                    </label>
                    <input
                        className="w-full bg-surface-container-highest border-none rounded-md px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/50 outline-none"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary text-on-primary font-bold py-4 rounded-full mt-4 hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                >
                    {submitting ? 'Posting...' : 'Post Transaction'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;