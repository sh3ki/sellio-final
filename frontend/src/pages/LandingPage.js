import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, TrendingUp, Package, BarChart3, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-slate-900">Sellio</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">How It Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Pricing</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" data-testid="view-demo-btn">View Demo</Button>
            </Link>
            <Link to="/dashboard">
              <Button className="bg-slate-900 hover:bg-slate-800" data-testid="get-started-btn">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              POS and inventory, <span className="text-teal-400">simplified.</span>
            </h1>
            <p className="text-xl text-slate-300">
              Speed meets clarity. Manage sales, track inventory, and grow your business with the modern POS system built for today's retailers.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20" data-testid="hero-get-started-btn">
                  Get Started <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800" data-testid="hero-demo-btn">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700">
              <img 
                src="https://images.pexels.com/photos/8386656/pexels-photo-8386656.jpeg" 
                alt="Dashboard Preview" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything you need to succeed</h2>
            <p className="text-xl text-slate-600">Powerful features designed for modern retail businesses</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Fast POS",
                description: "Lightning-fast checkout process that keeps your lines moving and customers happy."
              },
              {
                icon: Package,
                title: "Real-time Inventory",
                description: "Track stock levels in real-time and never run out of your best-selling items."
              },
              {
                icon: BarChart3,
                title: "Sales Analytics",
                description: "Deep insights into your sales performance with beautiful, actionable reports."
              },
              {
                icon: Store,
                title: "Multi-store Support",
                description: "Manage multiple locations from one centralized dashboard with ease."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-100">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="text-teal-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Get started in three simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Set Up Your Store",
                description: "Add your products, set prices, and configure your store settings in minutes."
              },
              {
                step: "02",
                title: "Start Selling",
                description: "Use our intuitive POS interface to process transactions quickly and accurately."
              },
              {
                step: "03",
                title: "Grow Your Business",
                description: "Leverage insights from analytics to make data-driven decisions and increase revenue."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600">Choose the plan that fits your business</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                features: ["1 Store Location", "Up to 100 Products", "Basic Analytics", "Email Support"]
              },
              {
                name: "Professional",
                price: "$79",
                features: ["3 Store Locations", "Unlimited Products", "Advanced Analytics", "Priority Support"],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$199",
                features: ["Unlimited Locations", "Unlimited Products", "Custom Analytics", "24/7 Phone Support"]
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border-2 ${
                  plan.popular ? 'border-teal-500' : 'border-slate-100'
                }`}
              >
                {plan.popular && (
                  <div className="bg-teal-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-slate-600">
                      <CheckCircle2 className="text-teal-500 mr-2 flex-shrink-0" size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-teal-500 hover:bg-teal-600' : 'bg-slate-900 hover:bg-slate-800'}`}
                  data-testid={`pricing-${plan.name.toLowerCase()}-btn`}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to transform your business?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of retailers who trust Sellio for their daily operations
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg shadow-teal-500/20" data-testid="final-cta-btn">
              Start Your Free Trial <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12 px-6 text-slate-400">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-white">Sellio</span>
            </div>
            <p className="text-sm">Modern POS and inventory management for retail businesses.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          © 2024 Sellio. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
