import { useState } from 'react';
import { useTaskActions } from '../hooks/useTaskActions';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// The TaskForm component provides the input fields and button to create a new task.
const TaskForm = () => {
  // 1. State for the inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // State for styling: tells us if the user is currently clicking/typing inside the form
  const [isFocused, setIsFocused] = useState(false);
  
  // 2. Get the addTask function from our context
  const { addTask } = useTaskActions();

  // 3. What happens when the user clicks "Add Task"
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error('Please add a title and description');
      return;
    }

    await addTask({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <div 
      className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl border border-gray-100 dark:border-gray-700 mb-8 transition-all duration-300 relative overflow-hidden ${isFocused ? "shadow-2xl shadow-indigo-500/10" : "shadow-sm"}`}
    >
        {isFocused && (
          <div 
            className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500 transition-opacity duration-300" 
          />
        )}
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight">Create New Task</h3>
      
      <form 
        onSubmit={handleSubmit} 
        className="space-y-5"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
          }
        }}
      >
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 transition-colors">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-900/50 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600"
            placeholder="E.g., Complete project presentation"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 transition-colors">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 dark:bg-gray-900/50 dark:text-white transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 resize-none"
            placeholder="Add some details about the task..."
          />
        </div>
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
