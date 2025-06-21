
import React from 'react';
import { TaskCard } from './TaskCard';
import { Task } from './TaskBoard';

interface TaskColumnProps {
  title: string;
  status: Task['status'];
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: Task['status']) => void;
}

export const TaskColumn = ({ title, status, tasks, onTaskMove }: TaskColumnProps) => {
  const getColumnColor = () => {
    switch (status) {
      case 'todo': return 'border-red-200 bg-red-50/50';
      case 'inprogress': return 'border-yellow-200 bg-yellow-50/50';
      case 'done': return 'border-green-200 bg-green-50/50';
      default: return 'border-gray-200 bg-gray-50/50';
    }
  };

  return (
    <div className={`rounded-lg border-2 ${getColumnColor()} p-4 h-fit min-h-[500px]`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="bg-white/80 text-gray-600 text-sm px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onMove={onTaskMove}
          />
        ))}
      </div>
    </div>
  );
};
