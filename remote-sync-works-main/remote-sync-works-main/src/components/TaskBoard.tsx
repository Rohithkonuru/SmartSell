
import React, { useState } from 'react';
import { TaskColumn } from './TaskColumn';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: 'todo' | 'inprogress' | 'done';
  points: number;
}

export const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design new user interface',
      description: 'Create mockups for the dashboard redesign',
      assignee: 'Alice Johnson',
      dueDate: '2024-12-25',
      status: 'todo',
      points: 150
    },
    {
      id: '2',
      title: 'Implement authentication',
      description: 'Set up user login and registration system',
      assignee: 'Bob Smith',
      dueDate: '2024-12-23',
      status: 'inprogress',
      points: 200
    },
    {
      id: '3',
      title: 'Write documentation',
      description: 'Document the API endpoints and usage',
      assignee: 'Carol Davis',
      dueDate: '2024-12-20',
      status: 'done',
      points: 100
    }
  ]);

  const handleTaskMove = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const },
    { id: 'inprogress', title: 'In Progress', status: 'inprogress' as const },
    { id: 'done', title: 'Done', status: 'done' as const }
  ];

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Sprint Tasks</h2>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          <Plus size={16} className="mr-2" />
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        {columns.map(column => (
          <TaskColumn
            key={column.id}
            title={column.title}
            status={column.status}
            tasks={tasks.filter(task => task.status === column.status)}
            onTaskMove={handleTaskMove}
          />
        ))}
      </div>
    </div>
  );
};
