
import React from 'react';
import { Task } from './TaskBoard';
import { Calendar, User, Star } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onMove: (taskId: string, newStatus: Task['status']) => void;
}

export const TaskCard = ({ task, onMove }: TaskCardProps) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMove(task.id, e.target.value as Task['status']);
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'todo': return 'text-red-600';
      case 'inprogress': return 'text-yellow-600';
      case 'done': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-white/50">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-gray-800 text-sm leading-tight">{task.title}</h4>
        <div className="flex items-center gap-1 text-orange-500">
          <Star size={12} />
          <span className="text-xs font-medium">{task.points}</span>
        </div>
      </div>
      
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{task.description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <User size={12} />
          <span>{task.assignee}</span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar size={12} />
          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>
      
      <select
        value={task.status}
        onChange={handleStatusChange}
        className={`mt-3 w-full text-xs p-2 rounded border border-gray-200 bg-white/80 ${getStatusColor()} font-medium`}
      >
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
};
