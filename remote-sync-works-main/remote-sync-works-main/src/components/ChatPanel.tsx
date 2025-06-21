
import React, { useState } from 'react';
import { Send, X, Users as UsersIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatPanelProps {
  onClose: () => void;
}

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  avatar: string;
}

export const ChatPanel = ({ onClose }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Alice Johnson',
      content: 'Hey team! Just finished the UI mockups. Check them out when you have a chance.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      avatar: 'AJ'
    },
    {
      id: '2',
      user: 'Bob Smith',
      content: 'Great work Alice! The authentication system is coming along nicely too.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      avatar: 'BS'
    },
    {
      id: '3',
      user: 'Carol Davis',
      content: 'Documentation is up to date. Ready for the next sprint!',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      avatar: 'CD'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers] = useState(['Alice Johnson', 'Bob Smith', 'Carol Davis']);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: 'You',
        content: newMessage,
        timestamp: new Date(),
        avatar: 'YU'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-800">Team Chat</h3>
          <div className="flex items-center gap-1 text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs">{onlineUsers.length} online</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>

      <div className="p-3 border-b border-white/20">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <UsersIcon size={14} />
          <span>Online ({onlineUsers.length})</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {onlineUsers.map((user, index) => (
            <div key={index} className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{user.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
              {message.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-800 text-sm">{message.user}</span>
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/20">
        <div className="flex gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 resize-none bg-white/80 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            size="sm"
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
