import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart3, Upload, TrendingUp, Users, Code, Lightbulb } from 'lucide-react';

export const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "SmartSell",
      subtitle: "Your Business, Visualized.",
      content: (
        <div className="text-center space-y-8">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto">
            <BarChart3 className="w-16 h-16 text-white" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SmartSell
            </h1>
            <p className="text-2xl text-gray-600 font-light">Your Business, Visualized.</p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Empowering small business owners with simple, powerful analytics through CSV data visualization
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Problem",
      subtitle: "Small businesses struggle with data insights",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Small Business Owners Face Real Challenges</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <span className="text-2xl">😰</span>
                <div>
                  <h3 className="font-semibold text-red-900">Complex Analytics Tools</h3>
                  <p className="text-sm text-red-700">Enterprise solutions are too complex and expensive for small shops</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <span className="text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-orange-900">Data Scattered Everywhere</h3>
                  <p className="text-sm text-orange-700">Sales data, inventory, and insights exist in different systems</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <span className="text-2xl">⏰</span>
                <div>
                  <h3 className="font-semibold text-yellow-900">Time-Consuming Analysis</h3>
                  <p className="text-sm text-yellow-700">Manual calculations take hours away from running the business</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-semibold text-blue-900">Missing Growth Opportunities</h3>
                  <p className="text-sm text-blue-700">Without clear insights, it's hard to make informed business decisions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Our Solution",
      subtitle: "Simple, powerful analytics for every business",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SmartSell Makes Analytics Simple</h2>
            <p className="text-lg text-gray-600">Transform your CSV data into beautiful, actionable insights</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interactive Dashboard</h3>
              <p className="text-sm text-gray-600">Beautiful charts showing sales trends, top products, and key metrics</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy CSV Upload</h3>
              <p className="text-sm text-gray-600">Drag and drop your daily sales data - no technical setup required</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Insights</h3>
              <p className="text-sm text-gray-600">Automatic alerts for low stock, trending products, and growth opportunities</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">3 Minutes</div>
                <div className="text-sm text-blue-700">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$19/mo</div>
                <div className="text-sm text-green-700">Simple Pricing</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">Mobile-First</div>
                <div className="text-sm text-purple-700">Design</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "How It Works",
      subtitle: "Three simple steps to business insights",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple 3-Step Process</h2>
          </div>
          <div className="space-y-8">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">1</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">📥 Upload Your CSV</h3>
                <p className="text-gray-600">Simply drag and drop your daily sales CSV file with product names, quantities, and prices</p>
              </div>
              <div className="w-64 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">2</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">📊 View Dashboard</h3>
                <p className="text-gray-600">Instantly see beautiful charts, top products, stock alerts, and sales trends</p>
              </div>
              <div className="w-64 h-32 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">3</div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">📤 Export Reports</h3>
                <p className="text-gray-600">Generate professional PDF reports to share with partners or track progress</p>
              </div>
              <div className="w-64 h-32 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Real-World Impact",
      subtitle: "Scalable solution for any business type",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Every Small Business</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">🧁</div>
              <h3 className="font-semibold text-gray-900 mb-2">Bakeries</h3>
              <p className="text-sm text-gray-600">Track daily pastry sales, ingredient inventory, and seasonal trends</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">Bookstores</h3>
              <p className="text-sm text-gray-600">Monitor bestsellers, manage stock levels, and identify reading trends</p>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="text-4xl mb-4">👕</div>
              <h3 className="font-semibold text-gray-900 mb-2">Clothing Shops</h3>
              <p className="text-sm text-gray-600">Analyze fashion trends, size preferences, and seasonal performance</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Projected Impact</h3>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600">2 Hours</div>
                <div className="text-sm text-gray-600">Daily Time Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">15%</div>
                <div className="text-sm text-gray-600">Revenue Increase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">50%</div>
                <div className="text-sm text-gray-600">Better Inventory</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">1000+</div>
                <div className="text-sm text-gray-600">Target Businesses</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Tech Stack & Team",
      subtitle: "Built with modern, reliable technology",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Modern Technology</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Tech Stack
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">R</div>
                  <div>
                    <div className="font-medium">React.js</div>
                    <div className="text-sm text-gray-600">Modern frontend framework</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">N</div>
                  <div>
                    <div className="font-medium">Node.js + Express</div>
                    <div className="text-sm text-gray-600">Scalable backend API</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">M</div>
                  <div>
                    <div className="font-medium">MongoDB</div>
                    <div className="text-sm text-gray-600">Flexible data storage</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">V</div>
                  <div>
                    <div className="font-medium">Vercel</div>
                    <div className="text-sm text-gray-600">Fast, reliable hosting</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Core Team
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">JS</div>
                  <div>
                    <div className="font-medium text-gray-900">John Smith</div>
                    <div className="text-sm text-gray-600">Full-Stack Developer</div>
                    <div className="text-xs text-blue-600">React • Node.js • 5 years</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">AD</div>
                  <div>
                    <div className="font-medium text-gray-900">Alice Davis</div>
                    <div className="text-sm text-gray-600">UX/UI Designer</div>
                    <div className="text-xs text-green-600">Figma • Design Systems • 4 years</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">MJ</div>
                  <div>
                    <div className="font-medium text-gray-900">Mike Johnson</div>
                    <div className="text-sm text-gray-600">Business Analyst</div>
                    <div className="text-xs text-orange-600">Small Business • Analytics • 6 years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center">
            <Lightbulb className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ready to Launch</h3>
            <p className="text-blue-100 mb-4">MVP completed • Beta testing in progress • Launch in Q2 2024</p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div>✅ Frontend Complete</div>
              <div>✅ API Development</div>
              <div>✅ User Testing</div>
              <div>🚀 Production Ready</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Slide Content */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 min-h-[600px] p-8 mb-6">
        {slides[currentSlide].content}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-4 text-sm text-gray-500">
        Slide {currentSlide + 1} of {slides.length}: {slides[currentSlide].title}
      </div>
    </div>
  );
};
