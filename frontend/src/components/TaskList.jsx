import { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useTaskActions } from '../hooks/useTaskActions';
import TaskItem from './TaskItem';
import { ArrowUpDown, ClipboardList } from 'lucide-react';
import { useTaskNotification } from '../hooks/useTaskNotification';

const TaskList = () => {
  
  const { tasks, loading } = useContext(TaskContext);
  const { sortTasks } = useTaskActions();
  const [sortOrder, setSortOrder] = useState('latest');


  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    sortTasks(order);
  };

  useTaskNotification(tasks);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div 
      className="text-center py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 animate-[fadeIn_0.3s_ease-out]"
      >
        <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-full flex items-center justify-center mb-5 shadow-inner">
          <ClipboardList className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">No tasks yet</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Get started by creating a new task above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
          Your Tasks 
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 rounded-full shadow-inner">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </h3>
        <div className="flex items-center gap-2 text-sm bg-gray-50 dark:bg-gray-900/50 py-1.5 px-3 rounded-xl border border-gray-100 dark:border-gray-700">
          <ArrowUpDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="bg-transparent border-none text-gray-700 dark:text-gray-300 font-semibold focus:ring-0 cursor-pointer pr-6 py-0 appearance-none outline-none"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
