import taskService from '../services/taskService.js';

async function list(_req, res, next) {
  try {
    const tasks = await taskService.findAll();
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const task = await taskService.findById(req.params.id);
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export default { list, getById, create, update, remove };