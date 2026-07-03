import { useState } from 'react';
import { useTaskActions } from '../hooks/useTaskActions';
import { Trash2, Edit2, Check, X, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';


const TaskItem = ({ task }) => {
  
  const { updateTask, deleteTask } = useTaskActions();
  

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editStatus, setEditStatus] = useState(task.status);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100/80 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/30';
      case 'In Progress':
        return 'bg-blue-100/80 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30';
      default:
        return 'bg-yellow-100/80 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <Check className="w-3.5 h-3.5 mr-1" />;
      case 'In Progress':
        return <Clock className="w-3.5 h-3.5 mr-1" />;
      default:
        return <AlertCircle className="w-3.5 h-3.5 mr-1" />;
    }
  };

  const handleUpdate = async () => {
    if (!editTitle || !editDescription) {
      toast.error('Title and description cannot be empty');
      return;
    }
    
    await updateTask(task._id, {
      title: editTitle,
      description: editDescription,
      status: editStatus,
    });
    setIsEditing(false);
  };

  const handleStatusChange = async (newStatus) => {
    await updateTask(task._id, { status: newStatus });
  };

  if (isEditing) {
    return (
      <div 
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border-2 border-indigo-500/30 dark:border-indigo-400/30 transition-all z-10 animate-[fadeIn_0.3s_ease-out]"
      >
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 dark:text-white dark:bg-gray-700/50 font-bold"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 dark:text-gray-300 dark:bg-gray-700/50 resize-none text-sm"
          />
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white dark:bg-gray-700/50 font-medium text-gray-900 dark:text-white"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 sm:flex-none p-2.5 flex justify-center items-center text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={handleUpdate}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-indigo-500/20 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700/50 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 animate-[fadeIn_0.3s_ease-out]"
    >
      <div className="flex justify-between items-start mb-3 gap-2">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{task.title}</h4>
        <span className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(task.status)} shadow-sm`}>
          {getStatusIcon(task.status)}
          {task.status}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
        {task.description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
        <div className="text-xs font-medium text-gray-400 dark:text-gray-500 flex items-center bg-gray-50 dark:bg-gray-900/50 px-2 py-1 rounded-md">
          <Clock className="w-3 h-3 mr-1.5" />
          {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
        <div className="flex gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          {task.status !== 'Completed' && (
            <button
              onClick={() => handleStatusChange('Completed')}
              title="Mark as completed"
              className="p-2 text-green-600 bg-green-50 hover:bg-green-100 dark:bg-green-500/10 dark:hover:bg-green-500/20 rounded-xl transition-all shadow-sm hover:scale-110 active:scale-95"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsEditing(true)}
            title="Edit task"
            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/20 rounded-xl transition-all shadow-sm hover:scale-110 active:scale-95"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteTask(task._id)}
            title="Delete task"
            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 rounded-xl transition-all shadow-sm hover:scale-110 active:scale-95"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
