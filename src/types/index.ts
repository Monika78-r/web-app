export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
  user_id: string;
  shared_with?: string[];
}

export interface TaskShare {
  id: string;
  task_id: string;
  user_id: string;
  shared_with_user_id: string;
  created_at: string;
}

export type TaskFilter = 'all' | 'today' | 'overdue' | 'completed' | 'shared';
export type TaskSort = 'due_date' | 'priority' | 'created_at' | 'status';