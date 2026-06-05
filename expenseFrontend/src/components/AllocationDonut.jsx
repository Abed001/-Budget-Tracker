import React from 'react';

const AllocationDonut = ({ income = 0, expenses = 0 }) => {
  const total = income + expenses;
  const expensePercentage = total > 0 ? (expenses / total) * 100 : 0;
  const incomePercentage = total > 0 ? (income / total) * 100 : 0;

  const expenseDash = expensePercentage;
  const incomeDash = incomePercentage;
  const expenseOffset = -incomePercentage;

  return (
    <div className="bg-surface-container-low rounded-xl p-8 border border-outline-variant/5 flex flex-col items-center">
      <h3 className="text-xl font-bold text-on-surface w-full mb-8">
        Allocation
      </h3>
      <div className="relative w-48 h-48 mb-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-surface-container-highest"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeDasharray="100, 100"
            strokeWidth="3"
          />
          <path
            className="text-secondary"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeDasharray={`${incomeDash}, 100`}
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            className="text-tertiary"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeDasharray={`${expenseDash}, 100`}
            strokeDashoffset={expenseOffset}
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-on-surface-variant font-label uppercase">
            Total
          </span>
          <span className="text-2xl font-black text-on-surface font-headline">
            ${total}
          </span>
        </div>
      </div>
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="text-sm font-medium text-on-surface-variant">
              Income
            </span>
          </div>
          <span className="text-sm font-bold text-on-surface">
            ${income.toLocaleString()} ({Math.round(incomePercentage)}%)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-tertiary"></div>
            <span className="text-sm font-medium text-on-surface-variant">
              Expense
            </span>
          </div>
          <span className="text-sm font-bold text-on-surface">
            ${expenses.toLocaleString()} ({Math.round(expensePercentage)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default AllocationDonut;
