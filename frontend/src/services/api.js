import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Config axios to always send credentials (cookies)
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Auth Services
export const registerService = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginService = async (userData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};

export const logoutService = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

s
export const getTasksService = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTaskService = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTaskService = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTaskService = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
