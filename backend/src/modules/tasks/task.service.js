import taskRepository from './task.repository.js';
import ApiError from '../../utils/ApiError.js';

async function findAll() {
  return taskRepository.findAll();
}

async function findById(id) {
  const task = await taskRepository.findById(id);
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
  return taskRepository.create(taskData);
}

async function updateTask(id, data) {
  const task = await taskRepository.findById(id);
  if (!task) {
    throw ApiError.notFound('La tarea no fue encontrada');
  }
  const { name, description, completed } = data;
  const taskData = { name, description };
  if (completed !== undefined) {
    taskData.completed = completed;
  }
  return taskRepository.update(task, taskData);
}

async function deleteTask(id) {
  const task = await taskRepository.findById(id);
  if (!task) {
    throw ApiError.notFound('La tarea no fue encontrada');
  }
  await taskRepository.remove(task);
}

export default { findAll, findById, createTask, updateTask, deleteTask };
