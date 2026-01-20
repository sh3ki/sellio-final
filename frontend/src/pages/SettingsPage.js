import { DashboardLayout } from '@/components/DashboardLayout';
import { Store, DollarSign, Users, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const SettingsPage = () => {
  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6 max-w-4xl">
        {/* Store Information */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                <Store size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Store Information</h3>
                <p className="text-sm text-slate-500">Manage your store details</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Store Name
                </label>
                <input
                  type="text"
                  defaultValue="Sellio Demo Store"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  data-testid="store-name-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Store ID
                </label>
                <input
                  type="text"
                  defaultValue="STORE-12345"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  disabled
                  data-testid="store-id-input"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Store Address
              </label>
              <input
                type="text"
                defaultValue="123 Main Street, New York, NY 10001"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                data-testid="store-address-input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  defaultValue="contact@sellio-demo.com"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  data-testid="phone-input"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tax Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <DollarSign size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Tax Settings</h3>
                <p className="text-sm text-slate-500">Configure tax rates and options</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Default Tax Rate (%)
                </label>
                <input
                  type="number"
                  defaultValue="8.00"
                  step="0.01"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  data-testid="tax-rate-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tax ID Number
                </label>
                <input
                  type="text"
                  defaultValue="TAX-987654321"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  data-testid="tax-id-input"
                />
              </div>
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 text-teal-500 border-slate-300 rounded focus:ring-teal-500"
                  data-testid="tax-inclusive-checkbox"
                />
                <span className="text-sm font-medium text-slate-700">
                  Include tax in product prices
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Currency Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Currency Settings</h3>
            <p className="text-sm text-slate-500">Select your store currency</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Currency
                </label>
                <select 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  data-testid="currency-select"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Currency Symbol Position
                </label>
                <select 
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  data-testid="symbol-position-select"
                >
                  <option value="before">Before ($100)</option>
                  <option value="after">After (100$)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* User Roles */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">User Roles</h3>
                  <p className="text-sm text-slate-500">Manage user permissions</p>
                </div>
              </div>
              <Button className="bg-teal-500 hover:bg-teal-600" data-testid="add-user-btn">
                Add User
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'John Doe', email: 'john@sellio.com', role: 'Admin', status: 'Active' },
                  { name: 'Jane Smith', email: 'jane@sellio.com', role: 'Manager', status: 'Active' },
                  { name: 'Bob Johnson', email: 'bob@sellio.com', role: 'Cashier', status: 'Active' }
                ].map((user, index) => (
                  <tr key={index} className="hover:bg-slate-50" data-testid={`user-row-${index}`}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-teal-600 hover:text-teal-700 font-medium text-sm mr-3" data-testid={`edit-user-${index}`}>
                        Edit
                      </button>
                      <button className="text-slate-600 hover:text-slate-700 font-medium text-sm" data-testid={`remove-user-${index}`}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Bell size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Notifications</h3>
                <p className="text-sm text-slate-500">Configure notification preferences</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: 'Low stock alerts', checked: true },
              { label: 'Daily sales reports', checked: true },
              { label: 'New order notifications', checked: false },
              { label: 'Customer feedback', checked: true }
            ].map((item, index) => (
              <label key={index} className="flex items-center justify-between cursor-pointer" data-testid={`notification-${index}`}>
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
                <input
                  type="checkbox"
                  defaultChecked={item.checked}
                  className="w-4 h-4 text-teal-500 border-slate-300 rounded focus:ring-teal-500"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Save Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" data-testid="cancel-btn">Cancel</Button>
          <Button className="bg-slate-900 hover:bg-slate-800" data-testid="save-changes-btn">
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
