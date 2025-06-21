
import React from 'react';
import { Trophy, Star, MessageCircle } from 'lucide-react';

export const UserProfile = () => {
  const user = {
    name: 'John Doe',
    avatar: 'JD',
    points: 2450,
    level: 8,
    tasksCompleted: 12,
    messagesCount: 89
  };

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">Level {user.level}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Star size={16} className="text-orange-500" />
          <span className="text-sm font-medium text-gray-700">{user.points} pts</span>
        </div>
        
        <div className="flex items-center gap-2">
          <MessageCircle size={16} className="text-blue-500" />
          <span className="text-sm font-medium text-gray-700">{user.messagesCount}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-medium text-gray-800">{user.name}</div>
          <div className="text-xs text-gray-600">{user.tasksCompleted} tasks completed</div>
        </div>
        
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
          {user.avatar}
        </div>
      </div>
    </div>
  );
};
