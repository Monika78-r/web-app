import React from 'react';
import { 
  CheckSquare, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Share2, 
  Filter,
  Users,
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTask } from '../../contexts/TaskContext';
import { TaskFilter } from '../../types';

export const Sidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const { filter, setFilter, tasks } = useTask();

  const filterOptions = [
    { id: 'all', label: 'All Tasks', icon: CheckSquare, count: tasks.length },
    { id: 'today', label: 'Due Today', icon: Calendar, count: tasks.filter(t => {
      if (!t.due_date) return false;
      return new Date(t.due_date).toDateString() === new Date().toDateString();
    }).length },
    { id: 'overdue', label: 'Overdue', icon: Clock, count: tasks.filter(t => {
      if (!t.due_date) return false;
      return new Date(t.due_date) < new Date() && t.status !== 'completed';
    }).length },
    { id: 'completed', label: 'Completed', icon: CheckCircle, count: tasks.filter(t => t.status === 'completed').length },
    { id: 'shared', label: 'Shared with Me', icon: Share2, count: tasks.filter(t => t.user_id !== user?.id).length },
  ];

  const handleFilterChange = (filterId: TaskFilter) => {
    setFilter(filterId);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
            <p className="text-sm text-gray-500">Manage your tasks</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex-1 p-4">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Filters
          </h3>
          {filterOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handleFilterChange(option.id as TaskFilter)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-lg
                  transition-colors text-sm font-medium
                  ${filter === option.id 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{option.label}</span>
                </div>
                <span className={`
                  px-2 py-1 rounded-full text-xs
                  ${filter === option.id 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt={user.full_name} className="w-10 h-10 rounded-full" />
            ) : (
              <span className="text-white font-medium">
                {user?.full_name?.charAt(0) || user?.email?.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.full_name || user?.email}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-1">
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button 
            onClick={signOut}
            className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};