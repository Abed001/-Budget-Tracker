import React from 'react';

const Sidebar = ({ onLogout }) => {
    return (
        <aside className="hidden lg:flex flex-col py-8 gap-4 h-screen w-64 border-r border-outline-variant/15 bg-surface-dim sticky top-0">
            <div className="px-8 mb-8">
                <h1 className="text-xl font-black text-primary tracking-tight font-headline">Finance Pro</h1>
                <p className="text-xs text-on-surface-variant/60 font-label">Premium Tier</p>
            </div>
            <nav className="flex-1 flex flex-col gap-1">
                <a className="bg-surface-container-high text-primary rounded-r-full border-l-4 border-primary px-6 py-3 flex items-center gap-3 transition-all scale-[0.98] active:duration-150" href="#">
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-sm font-medium">Dashboard</span>
                </a>
                <a className="text-primary/50 px-6 py-3 hover:bg-surface-container-low hover:text-primary rounded-r-full flex items-center gap-3 transition-all" href="#">
                    <span className="material-symbols-outlined">receipt_long</span>
                    <span className="text-sm font-medium">Transactions</span>
                </a>
                <a className="text-primary/50 px-6 py-3 hover:bg-surface-container-low hover:text-primary rounded-r-full flex items-center gap-3 transition-all" href="#">
                    <span className="material-symbols-outlined">insights</span>
                    <span className="text-sm font-medium">Analysis</span>
                </a>
                <a className="text-primary/50 px-6 py-3 hover:bg-surface-container-low hover:text-primary rounded-r-full flex items-center gap-3 transition-all" href="#">
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                    <span className="text-sm font-medium">Budgets</span>
                </a>
            </nav>
            <div className="px-8 mt-auto flex flex-col gap-4">
                <button className="bg-primary-container text-on-primary-container font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/10">
                    <span className="material-symbols-outlined text-sm">add</span>
                    <span className="text-sm">Add Transaction</span>
                </button>
                <div className="pt-6 border-t border-outline-variant/10 flex flex-col gap-2">
                    <a className="flex items-center gap-3 text-primary/50 text-sm hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">help_outline</span>
                        Help
                    </a>
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 text-primary/50 text-sm hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">logout</span>
                        Logout
                    </button>

                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
