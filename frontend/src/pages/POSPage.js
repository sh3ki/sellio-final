import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Search, Plus, Minus, Trash2, CreditCard, DollarSign, Smartphone } from 'lucide-react';
import { products } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export const POSPage = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return { ...item, quantity: Math.max(0, newQuantity) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (cart.length > 0) {
      alert('Checkout successful! (Demo only)');
      setCart([]);
    }
  };

  return (
    <DashboardLayout title="Point of Sale">
      <div className="flex gap-6 h-[calc(100vh-8rem)]">
        {/* Left Panel - Products */}
        <div className="flex-1 flex flex-col space-y-4">
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                data-testid="product-search"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  data-testid={`category-${category.toLowerCase()}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-slate-100 p-4 overflow-y-auto">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white border-2 border-slate-100 rounded-lg p-4 hover:border-teal-500 hover:shadow-md transition-all duration-200 text-left"
                  data-testid={`product-${product.id}`}
                >
                  <div className="aspect-square bg-slate-100 rounded-lg mb-3 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{product.name}</h3>
                  <p className="text-xs text-slate-500 mb-2">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-teal-600">${product.price.toFixed(2)}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      product.stock > 50 ? 'bg-emerald-100 text-emerald-700' :
                      product.stock > 20 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Cart */}
        <div className="w-96 bg-white rounded-lg shadow-sm border border-slate-100 flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Current Order</h2>
            <p className="text-sm text-slate-500">{cart.length} items</p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="text-slate-400" size={32} />
                </div>
                <p className="text-slate-500">Cart is empty</p>
                <p className="text-sm text-slate-400">Add products to start</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-3 pb-4 border-b border-slate-100" data-testid={`cart-item-${item.id}`}>
                  <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 text-sm truncate">{item.name}</h4>
                    <p className="text-teal-600 font-bold text-sm">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                        data-testid={`decrease-${item.id}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium text-sm" data-testid={`quantity-${item.id}`}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                        data-testid={`increase-${item.id}`}
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto w-7 h-7 rounded bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                        data-testid={`remove-${item.id}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals and Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-100 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Tax (8%)</span>
                  <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200">
                  <span className="text-slate-900">Total</span>
                  <span className="text-slate-900" data-testid="cart-total">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button 
                  className="flex flex-col items-center justify-center p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  data-testid="payment-cash"
                >
                  <DollarSign size={20} className="text-slate-700 mb-1" />
                  <span className="text-xs font-medium text-slate-700">Cash</span>
                </button>
                <button 
                  className="flex flex-col items-center justify-center p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  data-testid="payment-card"
                >
                  <CreditCard size={20} className="text-slate-700 mb-1" />
                  <span className="text-xs font-medium text-slate-700">Card</span>
                </button>
                <button 
                  className="flex flex-col items-center justify-center p-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  data-testid="payment-qr"
                >
                  <Smartphone size={20} className="text-slate-700 mb-1" />
                  <span className="text-xs font-medium text-slate-700">QR</span>
                </button>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white py-6 text-lg font-bold shadow-lg shadow-teal-500/20"
                data-testid="checkout-btn"
              >
                Complete Payment
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
