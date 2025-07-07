import { Task, User } from '../types';

// In-memory storage for demo purposes
let currentUser: User | null = null;
let tasks: Task[] = [];
let taskIdCounter = 1;

// Mock users for social login simulation
const mockUsers: Record<string, User> = {
  google: {
    id: 'user-google-123',
    email: 'user@gmail.com',
    full_name: 'John Doe',
    avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: new Date().toISOString(),
  },
  github: {
    id: 'user-github-456',
    email: 'user@github.com',
    full_name: 'Jane Smith',
    avatar_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: new Date().toISOString(),
  },
  facebook: {
    id: 'user-facebook-789',
    email: 'user@facebook.com',
    full_name: 'Mike Johnson',
    avatar_url: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    created_at: new Date().toISOString(),
  },
};

// Auth functions
export const signInWithProvider = async (provider: 'google' | 'github' | 'facebook') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  currentUser = mockUsers[provider];
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  
  return { user: currentUser, error: null };
};

export const signOut = async () => {
  currentUser = null;
  localStorage.removeItem('currentUser');
  return { error: null };
};

export const getCurrentUser = () => {
  if (currentUser) return currentUser;
  
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    currentUser = JSON.parse(stored);
  }
  
  return currentUser;
};

// Task functions
export const getTasks = async (userId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const userTasks = tasks.filter(task => 
    task.user_id === userId || task.shared_with?.includes(userId)
  );
  
  return { data: userTasks, error: null };
};

export const createTask = async (taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const newTask: Task = {
    ...taskData,
    id: `task-${taskIdCounter++}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  tasks.push(newTask);
  
  return { data: newTask, error: null };
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return { data: null, error: new Error('Task not found') };
  }
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  
  return { data: tasks[taskIndex], error: null };
};

export const deleteTask = async (id: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return { error: new Error('Task not found') };
  }
  
  tasks.splice(taskIndex, 1);
  return { error: null };
};

export const shareTask = async (taskId: string, userEmail: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find user by email (mock lookup)
  const targetUser = Object.values(mockUsers).find(user => user.email === userEmail);
  if (!targetUser) {
    return { error: new Error('User not found') };
  }
  
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    return { error: new Error('Task not found') };
  }
  
  const sharedWith = tasks[taskIndex].shared_with || [];
  if (!sharedWith.includes(targetUser.id)) {
    sharedWith.push(targetUser.id);
    tasks[taskIndex].shared_with = sharedWith;
  }
  
  return { data: tasks[taskIndex], error: null };
};

// Initialize with some sample tasks
export const initializeSampleTasks = (userId: string) => {
  if (tasks.length === 0) {
    const sampleTasks: Task[] = [
      {
        id: `task-${taskIdCounter++}`,
        title: 'Complete project documentation',
        description: 'Write comprehensive documentation for the new feature',
        due_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        priority: 'high',
        status: 'in_progress',
        created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        updated_at: new Date().toISOString(),
        user_id: userId,
      },
      {
        id: `task-${taskIdCounter++}`,
        title: 'Review pull requests',
        description: 'Review and approve pending pull requests from team members',
        due_date: new Date().toISOString(), // Today
        priority: 'medium',
        status: 'todo',
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        updated_at: new Date().toISOString(),
        user_id: userId,
      },
      {
        id: `task-${taskIdCounter++}`,
        title: 'Update dependencies',
        description: 'Update all project dependencies to latest versions',
        priority: 'low',
        status: 'completed',
        created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        updated_at: new Date().toISOString(),
        user_id: userId,
      },
    ];
    
    tasks.push(...sampleTasks);
  }
};