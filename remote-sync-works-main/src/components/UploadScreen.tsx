import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, CreditCard } from 'lucide-react';
import { uploadAPI } from '@/lib/api';

export const UploadScreen = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

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

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await handleFileUpload(files[0]);
    }
  };

  const handleFileInput = async (e) => {
    if (e.target.files && e.target.files[0]) {
      await handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    setUploadStatus('uploading');
    setUploadProgress(0);
    setError('');

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const result = await uploadAPI.uploadStatement(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setUploadStatus('success');
        setUploadProgress(0);
      }, 500);

      console.log('Upload successful:', result);
    } catch (error) {
      clearInterval(progressInterval);
      setUploadStatus('error');
      setError(error.message || 'Upload failed. Please try again.');
      setUploadProgress(0);
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
              : uploadStatus === 'error'
              ? 'border-red-400 bg-red-50'
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
          ) : uploadStatus === 'error' ? (
            <div className="space-y-4">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-red-700">Upload Failed</h3>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          ) : uploadStatus === 'uploading' ? (
            <div className="space-y-4">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700">Processing...</h3>
                <p className="text-blue-600">Analyzing your bank statement</p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{uploadProgress}% complete</p>
                </div>
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Supported File Formats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl">📄</div>
            <div>
              <div className="font-medium text-gray-900">PDF Files</div>
              <div className="text-sm text-gray-600">Bank statements in PDF format</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl">📊</div>
            <div>
              <div className="font-medium text-gray-900">CSV Files</div>
              <div className="text-sm text-gray-600">Comma-separated values</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl">📈</div>
            <div>
              <div className="font-medium text-gray-900">Excel Files</div>
              <div className="text-sm text-gray-600">.xlsx and .xls formats</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl">🔒</div>
            <div>
              <div className="font-medium text-gray-900">Secure Upload</div>
              <div className="text-sm text-gray-600">256-bit encryption</div>
            </div>
          </div>
        </div>
      </div>

      {/* Expected Data Format */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Expected Data Format</h3>
        <p className="text-gray-600 mb-4">
          Your bank statement should contain the following columns for optimal analysis:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 font-medium text-gray-900">Field</th>
                <th className="text-left p-3 font-medium text-gray-900">Example</th>
                <th className="text-left p-3 font-medium text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="p-3 font-medium text-gray-900">{item.field}</td>
                  <td className="p-3 text-gray-600 font-mono">{item.example}</td>
                  <td className="p-3 text-gray-600">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Processing Information */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">⚡ What Happens Next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📤</div>
            <div className="font-medium">Upload</div>
            <div className="text-sm opacity-90">Secure file upload</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-medium">Analyze</div>
            <div className="text-sm opacity-90">AI-powered analysis</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium">Report</div>
            <div className="text-sm opacity-90">Detailed insights</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 