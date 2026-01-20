import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Search, Download, Calendar } from 'lucide-react';
import { transactions } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All');

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPayment = paymentFilter === 'All' || txn.paymentMethod === paymentFilter;
    return matchesSearch && matchesPayment;
  });

  const paymentMethods = ['All', 'Cash', 'Card', 'QR'];

  return (
    <DashboardLayout title="Transaction History">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-600 mb-2">Total Transactions</p>
            <p className="text-3xl font-bold text-slate-900">{transactions.length}</p>
            <p className="text-sm text-emerald-600 font-medium mt-2">All time</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-600 mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-slate-900">
              ${transactions.reduce((sum, t) => sum + t.total, 0).toFixed(2)}
            </p>
            <p className="text-sm text-emerald-600 font-medium mt-2">+12.5% from last week</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-600 mb-2">Average Order</p>
            <p className="text-3xl font-bold text-slate-900">
              ${(transactions.reduce((sum, t) => sum + t.total, 0) / transactions.length).toFixed(2)}
            </p>
            <p className="text-sm text-emerald-600 font-medium mt-2">Per transaction</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-600 mb-2">Total Items Sold</p>
            <p className="text-3xl font-bold text-slate-900">
              {transactions.reduce((sum, t) => sum + t.items, 0)}
            </p>
            <p className="text-sm text-emerald-600 font-medium mt-2">Across all orders</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                data-testid="transaction-search"
              />
            </div>

            <div className="flex gap-2">
              {paymentMethods.map(method => (
                <button
                  key={method}
                  onClick={() => setPaymentFilter(method)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    paymentFilter === method
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  data-testid={`payment-filter-${method.toLowerCase()}`}
                >
                  {method}
                </button>
              ))}
            </div>

            <Button variant="outline" className="flex items-center gap-2" data-testid="date-range-btn">
              <Calendar size={20} />
              Date Range
            </Button>

            <Button className="bg-teal-500 hover:bg-teal-600 flex items-center gap-2" data-testid="export-btn">
              <Download size={20} />
              Export
            </Button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Method</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredTransactions.map((txn, index) => (
                  <tr key={txn.id} className="hover:bg-slate-50 transition-colors" data-testid={`transaction-row-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-sm font-mono text-slate-900 font-medium">{txn.id}</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {txn.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {txn.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-sm font-medium bg-slate-100 text-slate-700 rounded">
                        {txn.items} items
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        txn.paymentMethod === 'Cash' ? 'bg-emerald-100 text-emerald-700' :
                        txn.paymentMethod === 'Card' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {txn.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                      ${txn.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-teal-600 hover:text-teal-700 font-medium mr-3" data-testid={`view-details-${index}`}>
                        View
                      </button>
                      <button className="text-slate-600 hover:text-slate-700 font-medium" data-testid={`print-receipt-${index}`}>
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-medium">{filteredTransactions.length}</span> of <span className="font-medium">{transactions.length}</span> transactions
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled data-testid="prev-page">Previous</Button>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1 bg-slate-900 text-white rounded text-sm font-medium">1</button>
                <button className="px-3 py-1 hover:bg-slate-100 rounded text-sm font-medium">2</button>
                <button className="px-3 py-1 hover:bg-slate-100 rounded text-sm font-medium">3</button>
              </div>
              <Button variant="outline" size="sm" data-testid="next-page">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
