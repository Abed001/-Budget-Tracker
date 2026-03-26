import React from 'react';

const RecentLedgerList = ({ transactions = [] }) => {
    // Take only last 5 transactions
    const recentTransactions = transactions.slice(-5).reverse();

    const getIconForCategory = (category) => {
        const icons = {
            'income': 'work',
            'expense': 'shopping_cart',
            'housing': 'home',
            'food': 'restaurant',
            'transport': 'directions_car',
            'entertainment': 'movie'
        };
        return icons[category] || 'receipt';
    };

    return (
        <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-on-surface">Recent Ledger</h3>
                <button className="text-primary text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="space-y-1">
                {recentTransactions.length > 0 ? (
                    recentTransactions.map((tx) => (
                        <div key={tx._id || tx.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-high transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-surface-container-highest rounded-xl flex items-center justify-center text-on-surface-variant">
                                    <span className="material-symbols-outlined">{getIconForCategory(tx.category)}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-on-surface">{tx.title}</h4>
                                    <p className="text-xs text-on-surface-variant/60 font-label uppercase mt-0.5">
                                        {new Date(tx.date).toLocaleDateString()} • {tx.category || 'General'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className={`text-lg font-bold ${tx.type === 'income' ? 'text-secondary' : 'text-tertiary'}`}>
                                    {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </span>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-bright text-on-surface-variant hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                    </button>
                                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-bright text-on-surface-variant hover:text-error transition-colors">
                                        <span className="material-symbols-outlined text-sm">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-on-surface-variant/60">
                        No transactions yet. Add your first transaction!
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentLedgerList;