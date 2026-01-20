import { DashboardLayout } from '@/components/DashboardLayout';
import { Download, TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { revenueData, topProducts, paymentMethods } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const COLORS = ['#14B8A6', '#0F172A', '#F59E0B'];

export const ReportsPage = () => {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const avgRevenue = totalRevenue / revenueData.length;
  const currentMonth = revenueData[revenueData.length - 1].revenue;
  const prevMonth = revenueData[revenueData.length - 2].revenue;
  const growth = ((currentMonth - prevMonth) / prevMonth * 100).toFixed(1);

  return (
    <DashboardLayout title="Sales Reports">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100" data-testid="summary-gross-sales">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Gross Sales</span>
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-emerald-600 font-medium mt-2">Year to date</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100" data-testid="summary-net-sales">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Net Sales</span>
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <TrendingUp size={20} className="text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">${(totalRevenue * 0.92).toLocaleString()}</p>
            <p className="text-sm text-emerald-600 font-medium mt-2">After deductions</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100" data-testid="summary-avg-order">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-600">Avg Order Value</span>
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                <ShoppingBag size={20} className="text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">${avgRevenue.toFixed(2)}</p>
            <p className="text-sm text-emerald-600 font-medium mt-2">Per transaction</p>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Revenue Trend</h3>
              <p className="text-sm text-slate-500">Monthly revenue over the past year</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/20" data-testid="period-selector">
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
              </select>
              <Button variant="outline" className="flex items-center gap-2" data-testid="export-revenue-btn">
                <Download size={16} />
                Export
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                stroke="#64748B" 
                style={{ fontSize: '12px', fontFamily: 'Plus Jakarta Sans' }} 
              />
              <YAxis 
                stroke="#64748B" 
                style={{ fontSize: '12px', fontFamily: 'Plus Jakarta Sans' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontFamily: 'Plus Jakarta Sans'
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#14B8A6" 
                strokeWidth={3}
                dot={{ fill: '#14B8A6', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-teal-50 border border-teal-100 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700">Month-over-month growth</span>
              <span className="text-lg font-bold text-teal-600">+{growth}%</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Products Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Top Products by Revenue</h3>
              <p className="text-sm text-slate-500">Best performing products</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B" 
                  style={{ fontSize: '11px', fontFamily: 'Plus Jakarta Sans' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="#64748B" 
                  style={{ fontSize: '12px', fontFamily: 'Plus Jakarta Sans' }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontFamily: 'Plus Jakarta Sans'
                  }}
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#0F172A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Methods Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Payment Methods</h3>
              <p className="text-sm text-slate-500">Distribution by payment type</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentMethods}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontFamily: 'Plus Jakarta Sans'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {paymentMethods.map((method, index) => (
                <div key={method.name} className="flex items-center justify-between" data-testid={`payment-method-${index}`}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-sm text-slate-700">{method.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{method.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="bg-slate-900 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">Export Reports</h3>
              <p className="text-slate-300 text-sm">Download detailed analytics and reports</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100 border-0" data-testid="export-pdf">
                Export as PDF
              </Button>
              <Button variant="outline" className="bg-white text-slate-900 hover:bg-slate-100 border-0" data-testid="export-excel">
                Export as Excel
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600" data-testid="export-csv">
                Export as CSV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
