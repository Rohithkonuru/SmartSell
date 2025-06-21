
import React from 'react';
import { CheckSquare, MessageCircle, Users, Trophy, Settings } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  const menuItems = [
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-white/20 p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">TeamSync</h2>
        <p className="text-sm text-gray-600">Remote Team Collaboration</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-white/60 hover:shadow-md'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Your Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Tasks Completed</span>
            <span className="font-bold">12</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Team Points</span>
            <span className="font-bold text-green-600">2,450</span>
          </div>
        </div>
      </div>
    </div>
  );
};
