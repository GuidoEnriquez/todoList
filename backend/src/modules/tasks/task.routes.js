import { Router } from 'express';
import taskController from './task.controller.js';
import { validateTaskBody, validateTaskId } from './task.validation.js';

const router = Router();

router.get('/', taskController.list);
router.get('/:id', validateTaskId, taskController.getById);
router.post('/', validateTaskBody, taskController.create);
router.put('/:id', validateTaskId, validateTaskBody, taskController.update);
router.delete('/:id', validateTaskId, taskController.remove);

export default router;
