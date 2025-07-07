import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask, shareTask, initializeSampleTasks } from '../lib/storage';
import { Task, TaskFilter, TaskSort } from '../types';
import { useAuth } from './AuthContext';
import { toast } from '../components/ui/Toast';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  filter: TaskFilter;
  sort: TaskSort;
  setFilter: (filter: TaskFilter) => void;
  setSort: (sort: TaskSort) => void;
  createTask: (task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  shareTask: (taskId: string, userEmail: string) => Promise<void>;
  filteredTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sort, setSort] = useState<TaskSort>('created_at');

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    setLoading(true);
    
    // Initialize sample tasks for demo
    initializeSampleTasks(user.id);
    
    const { data, error } = await getTasks(user.id);

    if (error) {
      toast.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    if (!user) return;

    const { data, error } = await createTask({ ...taskData, user_id: user.id });

    if (error) {
      toast.error('Failed to create task');
      throw error;
    }

    setTasks(prev => [data!, ...prev]);
    toast.success('Task created successfully');
  };

  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    const { data, error } = await updateTask(id, updates);

    if (error) {
      toast.error('Failed to update task');
      throw error;
    }

    setTasks(prev => prev.map(task => task.id === id ? data! : task));
    toast.success('Task updated successfully');
  };

  const handleDeleteTask = async (id: string) => {
    const { error } = await deleteTask(id);

    if (error) {
      toast.error('Failed to delete task');
      throw error;
    }

    setTasks(prev => prev.filter(task => task.id !== id));
    toast.success('Task deleted successfully');
  };

  const handleShareTask = async (taskId: string, userEmail: string) => {
    const { data, error } = await shareTask(taskId, userEmail);

    if (error) {
      toast.error(error.message);
      return;
    }

    setTasks(prev => prev.map(task => task.id === taskId ? data! : task));
    toast.success(`Task shared with ${userEmail}`);
  };

  const filteredTasks = React.useMemo(() => {
    let filtered = [...tasks];

    // Apply filter
    switch (filter) {
      case 'today':
        filtered = filtered.filter((task) => {
          if (!task.due_date) return false;
          const today = new Date().toDateString();
          return new Date(task.due_date).toDateString() === today;
        });
        break;
      case 'overdue':
        filtered = filtered.filter((task) => {
          if (!task.due_date) return false;
          return new Date(task.due_date) < new Date() && task.status !== 'completed';
        });
        break;
      case 'completed':
        filtered = filtered.filter((task) => task.status === 'completed');
        break;
      case 'shared':
        filtered = filtered.filter((task) => task.user_id !== user?.id);
        break;
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sort) {
        case 'due_date':
          if (!a.due_date && !b.due_date) return 0;
          if (!a.due_date) return 1;
          if (!b.due_date) return -1;
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'status':
          const statusOrder = { todo: 1, in_progress: 2, completed: 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return filtered;
  }, [tasks, filter, sort, user]);

  const value = {
    tasks,
    loading,
    filter,
    sort,
    setFilter,
    setSort,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    shareTask: handleShareTask,
    filteredTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};