import React, { useState } from 'react';
import { Download, FileText, Calendar, Filter, Mail, Share2 } from 'lucide-react';

export const ExportScreen = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const reportTypes = [
    { id: 'sales', name: 'Sales Summary', description: 'Revenue and transaction overview', emoji: '💰' },
    { id: 'inventory', name: 'Inventory Report', description: 'Stock levels and alerts', emoji: '📦' },
    { id: 'products', name: 'Product Performance', description: 'Best and worst performers', emoji: '🏆' },
    { id: 'complete', name: 'Complete Dashboard', description: 'All metrics in one report', emoji: '📊' }
  ];

  const periods = [
    { id: 'today', name: 'Today', description: 'Last 24 hours' },
    { id: 'week', name: 'This Week', description: 'Last 7 days' },
    { id: 'month', name: 'This Month', description: 'Last 30 days' },
    { id: 'quarter', name: 'This Quarter', description: 'Last 90 days' }
  ];

  const formats = [
    { id: 'pdf', name: 'PDF Report', description: 'Professional formatted document', icon: FileText },
    { id: 'csv', name: 'CSV Data', description: 'Raw data for analysis', icon: FileText },
    { id: 'email', name: 'Email Report', description: 'Send to your inbox', icon: Mail }
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Simulate download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `smartsell-report-${selectedPeriod}.${selectedFormat}`;
      link.click();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">📤 Export Your Reports</h2>
        <p className="text-gray-600">Generate professional reports for your business insights</p>
      </div>

      {/* Report Types */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Report Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((type) => (
            <div key={type.id} className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{type.emoji}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{type.name}</h4>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Period Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Select Time Period</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`p-4 text-left border rounded-xl transition-colors ${
                selectedPeriod === period.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">{period.name}</div>
              <div className="text-sm text-gray-600">{period.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Format Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎨 Export Format</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {formats.map((format) => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className={`p-4 text-left border rounded-xl transition-colors ${
                selectedFormat === format.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <format.icon className="w-5 h-5" />
                <span className="font-medium">{format.name}</span>
              </div>
              <p className="text-sm text-gray-600">{format.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Export Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Report Preview</h3>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-gray-900">Sales Summary Report</h4>
              <p className="text-sm text-gray-600">Period: This Week • Format: {selectedFormat.toUpperCase()}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">$12,450</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white rounded-lg">
              <div className="text-lg font-semibold text-gray-900">168</div>
              <div className="text-xs text-gray-600">Items Sold</div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="text-lg font-semibold text-gray-900">24</div>
              <div className="text-xs text-gray-600">Products</div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="text-lg font-semibold text-gray-900">$74</div>
              <div className="text-xs text-gray-600">Avg. Order</div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="text-lg font-semibold text-green-600">+12%</div>
              <div className="text-xs text-gray-600">Growth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="text-center">
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating Report...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download {selectedFormat.toUpperCase()} Report
            </>
          )}
        </button>
        
        <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-600">
          <button className="flex items-center gap-2 hover:text-blue-600">
            <Share2 className="w-4 h-4" />
            Share Report
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600">
            <Calendar className="w-4 h-4" />
            Schedule Export
          </button>
        </div>
      </div>
    </div>
  );
};
