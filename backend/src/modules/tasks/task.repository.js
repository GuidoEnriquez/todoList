import Task from './task.model.js';

async function findAll() {
  return Task.findAll({ order: [['createdAt', 'DESC']] });
}

async function findById(id) {
  return Task.findByPk(id);
}

async function create(data) {
  return Task.create(data);
}

async function update(task, data) {
  return task.update(data);
}

async function remove(task) {
  await task.destroy();
}

export default { findAll, findById, create, update, remove };
