import { Request, Response } from 'express';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validationResult } from 'express-validator';
import { UpdateResult } from 'typeorm';

import { AppDataSource } from '../../index';
import { Task } from './tasks.entity';

export class TasksController {
    // constructor( // https://stackoverflow.com/q/49794140
    //     private taskRepository = AppDataSource.getRepository(Task),
    // ) {}

    // Method for 'GET' route: retrieving all Tasks
    public async getAll(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // Declare a variable to hold all tasks
        let allTasks: Task[];

        // Fetch all tasks using the repository
        try {
            allTasks = await AppDataSource.getRepository(Task).find({
                order: {
                    date: 'ASC',
                },
            });

            // Convert the tasks instance to an array of objects
            allTasks = instanceToPlain(allTasks) as Task[];

            return response.json(allTasks).status(200);
        } catch (_err) {
            return response
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
    }

    // Method for 'POST' route: creating a Task
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // Create new instance of the Task object
        const newTask = new Task();

        // Add the required properties to the Task object
        newTask.title = request.body.title;
        newTask.date = request.body.date;
        newTask.description = request.body.description;
        newTask.status = request.body.status;
        newTask.priority = request.body.priority;

        // Add new Task instance to the database
        let createdTask: Task;

        try {
            createdTask =
                await AppDataSource.getRepository(Task).save(newTask);

            // Convert the task instance to an object
            createdTask = instanceToPlain(createdTask) as Task;

            return response.json(createdTask).status(201);
        } catch (_err) {
            return response
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
    }

    // Method for 'PUT' route: updating a Task
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // Find the task if exists
        let task: Task | null;
        try {
            task = await AppDataSource.getRepository(Task).findOne({
                where: { id: request.body.id },
            });
        } catch (_err) {
            return response
                .json({ error: 'Internal Server Error' })
                .status(500);
        }

        // Return 400 if task does not exist
        if (!task) {
            return response
                .json({
                    error: 'The task with the specified ID does not exist',
                })
                .status(404);
        }

        // Declare an instance for updatedTask
        let updatedTask: UpdateResult;

        try {
            // Update the task in the database
            updatedTask = await AppDataSource.getRepository(Task).update(
                request.body.id,
                plainToInstance(Task, {
                    status: request.body.status,
                }),
            );

            // Convert the updatedTask instance to an UpdateResult object
            updatedTask = instanceToPlain(updatedTask) as UpdateResult;

            return response.json(updatedTask).status(201);
        } catch (_err) {
            return response
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
    }
}

export const taskController = new TasksController();
