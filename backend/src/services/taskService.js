import { Task } from '../models/index.js';
import ApiError from '../utils/ApiError.js';

async function findAll() {
  return Task.findAll({ order: [['createdAt', 'DESC']] });
}

async function findById(id) {
  const task = await Task.findByPk(id);
  if (!task) {
    throw ApiError.notFound('La tarea no fue encontrada');
  }
  return task;
}

async function createTask(data) {
  const { name, description, completed } = data;
  const taskData = { name, description };
  if (completed !== undefined) {
    taskData.completed = completed;
  }
  return Task.create(taskData);
}

async function updateTask(id, data) {
  const task = await Task.findByPk(id);
  if (!task) {
    throw ApiError.notFound('La tarea no fue encontrada');
  }
  const { name, description, completed } = data;
  const taskData = { name, description };
  if (completed !== undefined) {
    taskData.completed = completed;
  }
  return task.update(taskData);
}

async function deleteTask(id) {
  const task = await Task.findByPk(id);
  if (!task) {
    throw ApiError.notFound('La tarea no fue encontrada');
  }
  await task.destroy();
}

export default { findAll, findById, createTask, updateTask, deleteTask };
