import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditModal = ({ transaction, onClose, onUpdated }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'expense',
        date: '',
        note: ''
    });
    const [submitting, setSubmitting] = useState(false);

    // Fill form with transaction data when modal opens
    useEffect(() => {
        if (transaction) {
            setFormData({
                title: transaction.title || '',
                amount: transaction.amount || '',
                type: transaction.type || 'expense',
                date: transaction.date || new Date().toISOString().split('T')[0],
                note: transaction.note || ''
            });
        }
    }, [transaction]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const token = localStorage.getItem('token');
        console.log('Transaction ID:', transaction._id);  // 👈 ADD THIS
        console.log('Full transaction:', transaction);     // 👈 ADD THIS

        try {
            await axios.put(`http://localhost:3001/api/transactions/${transaction.id}`, {
                title: formData.title,
                amount: parseFloat(formData.amount),
                type: formData.type,
                date: formData.date,
                note: formData.note
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.success("Transaction updated successfully!");
            if (onUpdated) onUpdated(); // Refresh list
            onClose(); // Close modal
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update transaction");
        } finally {
            setSubmitting(false);
        }
    };

    if (!transaction) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-full max-w-md">
                <h2 className="text-xl font-bold mb-6">Edit Transaction</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full border rounded-md px-4 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Amount</label>
                        <input
                            name="amount"
                            type="number"
                            step="0.01"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full border rounded-md px-4 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border rounded-md px-4 py-2"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full border rounded-md px-4 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Note (optional)</label>
                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            className="w-full border rounded-md px-4 py-2"
                            rows="2"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {submitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;