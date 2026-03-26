import React from 'react';

const MetricsGrid = ({ totalBalance = 0, monthlyIncome = 0, monthlyExpenses = 0 }) => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Balance Card */}
            <div className="md:col-span-2 bg-surface-container-low rounded-xl p-8 flex flex-col justify-between border border-outline-variant/5 shadow-xl shadow-black/20">
                <div>
                    <span className="text-label text-on-surface-variant text-xs font-semibold tracking-wider uppercase">Total Net Worth</span>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-5xl font-extrabold text-primary font-headline tracking-tight">
                            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-secondary text-sm font-medium flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-full">
                            <span className="material-symbols-outlined text-xs">trending_up</span>
                            {monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome * 100).toFixed(1) : 0}%
                        </span>
                    </div>
                </div>
                <div className="mt-8 flex gap-4">
                    <div className="flex-1 bg-surface-container-high p-4 rounded-xl">
                        <span className="text-xs text-on-surface-variant/60">Monthly Income</span>
                        <p className="text-lg font-bold text-secondary mt-1">+${monthlyIncome.toLocaleString()}</p>
                    </div>
                    <div className="flex-1 border border-outline-variant/10 p-4 rounded-xl">
                        <span className="text-xs text-on-surface-variant/60">Monthly Expenses</span>
                        <p className="text-lg font-bold text-tertiary mt-1">-${monthlyExpenses.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Monthly Income Card */}
            <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/5 flex flex-col justify-between">
                <div>
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary mb-4">
                        <span className="material-symbols-outlined">payments</span>
                    </div>
                    <span className="text-label text-on-surface-variant text-xs font-semibold tracking-wider uppercase">Monthly Income</span>
                    <h3 className="text-3xl font-bold text-secondary font-headline mt-1">${monthlyIncome.toLocaleString()}</h3>
                </div>
                <div className="mt-4 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-3/4 rounded-full"></div>
                </div>
            </div>

            {/* Monthly Expenses Card */}
            <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/5 flex flex-col justify-between">
                <div>
                    <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center text-tertiary mb-4">
                        <span className="material-symbols-outlined">shopping_bag</span>
                    </div>
                    <span className="text-label text-on-surface-variant text-xs font-semibold tracking-wider uppercase">Monthly Expenses</span>
                    <h3 className="text-3xl font-bold text-tertiary font-headline mt-1">${monthlyExpenses.toLocaleString()}</h3>
                </div>
                <div className="mt-4 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary w-1/2 rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default MetricsGrid;