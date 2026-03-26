import React from 'react';

const FinancialChart = () => {
    return (
        <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-xl font-bold text-on-surface">Financial Momentum</h3>
                    <p className="text-sm text-on-surface-variant/60">Balance trend over the last 6 months</p>
                </div>
                <div className="flex bg-surface-container-high rounded-full p-1">
                    <button className="px-4 py-1 text-xs font-medium bg-surface-bright text-primary rounded-full">6M</button>
                    <button className="px-4 py-1 text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors">1Y</button>
                    <button className="px-4 py-1 text-xs font-medium text-on-surface-variant hover:text-on-surface transition-colors">ALL</button>
                </div>
            </div>

            {/* Mock Chart Container */}
            <div className="relative h-64 w-full flex items-end justify-between gap-2 px-2">
                {/* Chart Lines (Simulated with CSS) */}
                <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
                    <div className="border-b border-outline-variant/5 w-full"></div>
                    <div className="border-b border-outline-variant/5 w-full"></div>
                    <div className="border-b border-outline-variant/5 w-full"></div>
                    <div className="border-b border-outline-variant/5 w-full"></div>
                </div>
                <div className="flex-1 bg-gradient-to-t from-primary/20 to-primary/5 rounded-t-lg h-1/3 relative group">
                    <div className="absolute -top-1 left-0 right-0 h-1 bg-primary rounded-full"></div>
                </div>
                <div className="flex-1 bg-gradient-to-t from-primary/20 to-primary/5 rounded-t-lg h-1/2 relative">
                    <div className="absolute -top-1 left-0 right-0 h-1 bg-primary rounded-full"></div>
                </div>
                <div className="flex-1 bg-gradient-to-t from-primary/20 to-primary/5 rounded-t-lg h-2/3 relative">
                    <div className="absolute -top-1 left-0 right-0 h-1 bg-primary rounded-full"></div>
                </div>
                <div className="flex-1 bg-gradient-to-t from-primary/20 to-primary/10 rounded-t-lg h-3/4 relative">
                    <div className="absolute -top-1 left-0 right-0 h-1 bg-primary rounded-full"></div>
                </div>
                <div className="flex-1 bg-gradient-to-t from-primary/20 to-primary/10 rounded-t-lg h-5/6 relative">
                    <div className="absolute -top-1 left-0 right-0 h-1 bg-primary rounded-full"></div>
                </div>
                <div className="flex-1 bg-gradient-to-t from-primary/40 to-primary/20 rounded-t-lg h-[95%] relative border-x border-t border-primary/30">
                    <div className="absolute -top-1 left-0 right-0 h-1 bg-primary rounded-full"></div>
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-on-primary-container px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">$142k</div>
                </div>
            </div>
            <div className="flex justify-between mt-4 px-2">
                <span className="text-xs text-on-surface-variant/40 font-label uppercase">Jan</span>
                <span className="text-xs text-on-surface-variant/40 font-label uppercase">Feb</span>
                <span className="text-xs text-on-surface-variant/40 font-label uppercase">Mar</span>
                <span className="text-xs text-on-surface-variant/40 font-label uppercase">Apr</span>
                <span className="text-xs text-on-surface-variant/40 font-label uppercase">May</span>
                <span className="text-xs text-primary font-bold font-label uppercase">Jun</span>
            </div>
        </div>
    );
};

export default FinancialChart;
