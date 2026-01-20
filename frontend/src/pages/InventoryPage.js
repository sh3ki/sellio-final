import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Search, Filter, Plus, AlertCircle } from 'lucide-react';
import { products } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export const InventoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const getStockStatus = (stock) => {
    if (stock > 50) return 'In Stock';
    if (stock > 10) return 'Low Stock';
    return 'Out of Stock';
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const status = getStockStatus(product.stock);
    const matchesStatus = statusFilter === 'All' || status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    'All': products.length,
    'In Stock': products.filter(p => p.stock > 50).length,
    'Low Stock': products.filter(p => p.stock > 10 && p.stock <= 50).length,
    'Out of Stock': products.filter(p => p.stock <= 10).length
  };

  return (
    <DashboardLayout title="Inventory Management">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2">
            {Object.keys(statusCounts).map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
                data-testid={`filter-${status.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {status} ({statusCounts[status]})
              </button>
            ))}
          </div>
          
          <Button className="bg-teal-500 hover:bg-teal-600" data-testid="add-product-btn">
            <Plus size={20} className="mr-2" />
            Add Product
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                data-testid="inventory-search"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2" data-testid="filter-btn">
              <Filter size={20} />
              Filters
            </Button>
          </div>
        </div>

        {/* Low Stock Alert */}
        {statusCounts['Low Stock'] > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3" data-testid="low-stock-alert">
            <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-bold text-amber-900 mb-1">Low Stock Warning</h4>
              <p className="text-sm text-amber-800">
                {statusCounts['Low Stock']} products are running low on stock. Consider reordering soon.
              </p>
            </div>
          </div>
        )}

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredProducts.map((product, index) => {
                  const status = getStockStatus(product.stock);
                  const stockPercentage = Math.min((product.stock / 200) * 100, 100);
                  
                  return (
                    <tr key={product.id} className="hover:bg-slate-50 transition-colors" data-testid={`inventory-row-${index}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium text-slate-900">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-sm font-mono text-slate-600">{product.sku}</code>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-32">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-slate-900">{product.stock}</span>
                            <span className="text-xs text-slate-500">{stockPercentage.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                status === 'In Stock' ? 'bg-emerald-500' :
                                status === 'Low Stock' ? 'bg-amber-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${stockPercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          status === 'In Stock' ? 'bg-emerald-100 text-emerald-700' :
                          status === 'Low Stock' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-teal-600 hover:text-teal-700 font-medium mr-3" data-testid={`edit-${product.id}`}>
                          Edit
                        </button>
                        <button className="text-slate-600 hover:text-slate-700 font-medium" data-testid={`view-${product.id}`}>
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> products
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled data-testid="prev-page">Previous</Button>
              <Button variant="outline" size="sm" disabled data-testid="next-page">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
