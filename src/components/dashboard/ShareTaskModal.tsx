import React, { useState } from 'react';
import { Task } from '../../types';
import { useTask } from '../../contexts/TaskContext';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface ShareTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
}

export const ShareTaskModal: React.FC<ShareTaskModalProps> = ({ isOpen, onClose, task }) => {
  const { shareTask } = useTask();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !task) {
      return;
    }

    setLoading(true);
    
    try {
      await shareTask(task.id, email.trim());
      setEmail('');
      onClose();
    } catch (error) {
      console.error('Error sharing task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Task"
      size="md"
    >
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Task: {task?.title}</h4>
          <p className="text-sm text-gray-600">
            Share this task with other users by entering their email address below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user's email address"
            required
          />

          <div className="flex space-x-3 pt-4">
            <Button type="submit" loading={loading} className="flex-1">
              Share Task
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};