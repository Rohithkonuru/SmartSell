import React from 'react';
import { Dashboard } from '@/components/Dashboard';

interface IndexProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Index = ({ currentView, setCurrentView }: IndexProps) => {
  return <Dashboard currentView={currentView} setCurrentView={setCurrentView} />;
};

export default Index;
