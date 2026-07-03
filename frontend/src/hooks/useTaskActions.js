import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { createTaskService, updateTaskService, deleteTaskService } from '../services/api';
import toast from 'react-hot-toast';

export const useTaskActions = () => {
  const { setTasks } = useContext(TaskContext);

  const addTask = async (taskData) => {
    try {
      const newTask = await createTaskService(taskData); 
      setTasks(function (previousTasks) {
        const newTaskList = [...previousTasks];
        newTaskList.unshift(newTask); 
        return newTaskList;
      });
      toast.success('Task added!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add task');
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const updatedTask = await updateTaskService(id, taskData);
      
      setTasks(function (previousTasks) {
        const updatedList = previousTasks.map(function (task) {
          if (task._id === id) {
            return updatedTask;
          } else {
            return task;
          }
        });
        return updatedList;
      });

      toast.success('Task updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskService(id); 
      
      setTasks(function (previousTasks) {
        const filteredList = previousTasks.filter(function (task) {
          if (task._id !== id) {
            return true; // Keep the task
          } else {
            return false; 
          }
        });
        return filteredList;
      });

      toast.success('Task deleted!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const sortTasks = (order) => {
    setTasks(function (previousTasks) {
      const copyOfTasks = [...previousTasks];
      
      const sortedTasks = copyOfTasks.sort(function (taskA, taskB) {
        const dateA = new Date(taskA.createdAt);
        const dateB = new Date(taskB.createdAt);
        
        if (order === 'latest') {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      });
      
      return sortedTasks;
    });
  };

  return { addTask, updateTask, deleteTask, sortTasks };
};
