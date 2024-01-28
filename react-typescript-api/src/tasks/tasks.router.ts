import { Router } from 'express';

import { taskController } from './tasks.controller';
import { createValidator, updateValidator } from './tasks.validator';

// Router function
export const tasksRouter: Router = Router();

// Create a GET route for tasks
tasksRouter.get('/tasks', taskController.getAll);

// Create a POST route for creating a task
tasksRouter.post('/tasks', createValidator, taskController.create);

// Create a PUT route for updating a task
tasksRouter.put('/tasks', updateValidator, taskController.update);
