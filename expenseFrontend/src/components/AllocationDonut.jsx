import React from 'react';

const AllocationDonut = () => {
    return (
        <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/5 flex flex-col items-center">
            <h3 className="text-xl font-bold text-on-surface w-full mb-8">Allocation</h3>
            <div className="relative w-48 h-48 mb-8">
                {/* Custom CSS SVG Donut */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path className="text-surface-container-highest" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeWidth="3"></path>
                    <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="72, 100" strokeLinecap="round" strokeWidth="4"></path>
                    <path className="text-tertiary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="28, 100" strokeDashoffset="-72" strokeLinecap="round" strokeWidth="4"></path>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs text-on-surface-variant font-label uppercase">Savings</span>
                    <span className="text-2xl font-black text-on-surface font-headline">44%</span>
                </div>
            </div>
            <div className="w-full space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-secondary"></div>
                        <span className="text-sm font-medium text-on-surface-variant">Income Retained</span>
                    </div>
                    <span className="text-sm font-bold text-on-surface">72%</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                        <span className="text-sm font-medium text-on-surface-variant">Expense Ratio</span>
                    </div>
                    <span className="text-sm font-bold text-on-surface">28%</span>
                </div>
            </div>
        </div>
    );
};

export default AllocationDonut;
