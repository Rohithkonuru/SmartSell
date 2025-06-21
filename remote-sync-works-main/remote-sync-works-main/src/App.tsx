import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import './App.css';

// Components
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  const [currentView, setCurrentView] = useState('login');

  return (
    <TooltipProvider>
      <Router>
        <div className="App">
          <Toaster />
          <Sonner />
          
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard currentView={currentView} setCurrentView={setCurrentView} />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </TooltipProvider>
  );
}

export default App;
