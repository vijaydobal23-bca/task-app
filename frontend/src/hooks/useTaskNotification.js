import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useTaskNotification = (tasks) => {
  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    const pendingCount = tasks.filter(task => task.status === 'Pending').length;
    
    if (pendingCount > 0) {
      toast.error(`${pendingCount} task(s) pending`);
    } else {
      toast.success('No pending tasks');
    }
  }, [tasks]);
};
