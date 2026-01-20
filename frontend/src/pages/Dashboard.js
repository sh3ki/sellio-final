import { DashboardLayout } from '@/components/DashboardLayout';
import { DollarSign, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { salesData, topProducts, transactions } from '@/data/mockData';

const KPICard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-all duration-200" data-testid={`kpi-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-slate-600">{title}</span>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <div className="space-y-1">
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-emerald-600 font-medium">{change}</p>
    </div>
  </div>
);

export const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Today's Sales"
            value="$2,340"
            change="+12.5% from yesterday"
            icon={DollarSign}
            color="bg-teal-500"
          />
          <KPICard
            title="Total Transactions"
            value="156"
            change="+8.2% from yesterday"
            icon={ShoppingCart}
            color="bg-slate-900"
          />
          <KPICard
            title="Items Low in Stock"
            value="8"
            change="3 critical items"
            icon={Package}
            color="bg-amber-500"
          />
          <KPICard
            title="Monthly Revenue"
            value="$98,450"
            change="+23.1% from last month"
            icon={TrendingUp}
            color="bg-emerald-500"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sales Chart */}
          <div className="col-span-12 md:col-span-8 bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Sales Overview</h3>
              <p className="text-sm text-slate-500">Weekly sales performance</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="date" stroke="#64748B" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748B" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#14B8A6" 
                  strokeWidth={3}
                  dot={{ fill: '#14B8A6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products */}
          <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Top Products</h3>
              <p className="text-sm text-slate-500">Best sellers this week</p>
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between" data-testid={`top-product-${index}`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.sales} sold</p>
                    </div>
                  </div>
                  <p className="font-bold text-slate-900">${product.revenue.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
            <p className="text-sm text-slate-500">Latest sales activity</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {transactions.slice(0, 5).map((txn, index) => (
                  <tr key={txn.id} className="hover:bg-slate-50 transition-colors" data-testid={`transaction-row-${index}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-sm font-mono text-slate-900">{txn.id}</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {txn.date} {txn.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{txn.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded">
                        {txn.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                      ${txn.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded">
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
