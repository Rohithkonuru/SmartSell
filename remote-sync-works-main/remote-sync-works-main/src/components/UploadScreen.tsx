
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';

export const UploadScreen = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const sampleData = [
    { field: 'date', example: '2024-01-15', description: 'Transaction date' },
    { field: 'description', example: 'PAYMENT FROM CLIENT ABC', description: 'Transaction description' },
    { field: 'amount', example: '2500.00', description: 'Transaction amount (positive for income, negative for expenses)' },
    { field: 'balance', example: '15250.00', description: 'Account balance after transaction' },
    { field: 'type', example: 'CREDIT/DEBIT', description: 'Transaction type' }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // Simulate upload
    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
    }, 2000);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadStatus('uploading');
      setTimeout(() => {
        setUploadStatus('success');
      }, 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🏦 Upload Bank Mini Statement</h2>
        <p className="text-gray-600">Upload your bank statement to analyze startup profits and financial performance</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : uploadStatus === 'success'
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploadStatus === 'success' ? (
            <div className="space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-green-700">Statement Processed! 🎉</h3>
                <p className="text-green-600">Your financial data has been analyzed and added to the reports</p>
              </div>
            </div>
          ) : uploadStatus === 'uploading' ? (
            <div className="space-y-4">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700">Processing...</h3>
                <p className="text-blue-600">Analyzing your bank statement</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <CreditCard className="w-16 h-16 text-gray-400 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Drop your bank statement here</h3>
                <p className="text-gray-600 mb-4">Supports PDF, CSV, or Excel files</p>
                <input
                  type="file"
                  accept=".pdf,.csv,.xlsx,.xls"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Choose Bank Statement
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Supported Formats */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🏦 Supported Bank Statement Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">PDF Statements</span>
            </div>
            <p className="text-sm text-blue-700">Most common bank statement format</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">CSV Export</span>
            </div>
            <p className="text-sm text-green-700">Transaction data in spreadsheet format</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">Excel Files</span>
            </div>
            <p className="text-sm text-purple-700">Excel spreadsheets (.xlsx, .xls)</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <h4 className="font-medium text-gray-900 mb-3">Expected Data Fields:</h4>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Field Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Example</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row, index) => (
                <tr key={row.field} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-3 px-4 font-mono text-sm text-blue-600">{row.field}</td>
                  <td className="py-3 px-4 text-sm text-gray-900">{row.example}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-900">Financial Data Security:</h4>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>• All bank data is processed locally and securely</li>
                <li>• No sensitive information is stored permanently</li>
                <li>• Remove account numbers from statements before upload (optional)</li>
                <li>• Focus on transaction dates, amounts, and descriptions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
