import React, { useState } from 'react';
import { Plus, Filter, SortAsc } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { ShareTaskModal } from './ShareTaskModal';
import { useTask } from '../../contexts/TaskContext';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Task, TaskSort } from '../../types';

export const Dashboard: React.FC = () => {
  const { filteredTasks, loading, sort, setSort } = useTask();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleCreateTask = () => {
    setSelectedTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleShareTask = (task: Task) => {
    setSelectedTask(task);
    setShowShareModal(true);
  };

  const sortOptions = [
    { value: 'created_at', label: 'Created Date' },
    { value: 'due_date', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
              <p className="text-sm text-gray-600">
                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <Select
                value={sort}
                onChange={(e) => setSort(e.target.value as TaskSort)}
                options={sortOptions}
              />

              {/* Create Task Button */}
              <Button onClick={handleCreateTask} className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Task</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first task.</p>
              <Button onClick={handleCreateTask}>Create Task</Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onShare={handleShareTask}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3 text-center text-sm text-gray-500 animate-fade-in">
        <span>Made with <span className="text-pink-500">♥</span> for humans. <span className="font-semibold text-gray-700">Created by CHANDRU</span></span>
      </footer>
      {/* Modals */}
      <TaskForm
        isOpen={showTaskForm}
        onClose={() => setShowTaskForm(false)}
        task={selectedTask}
      />

      <ShareTaskModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        task={selectedTask}
      />
    </div>
  );
};