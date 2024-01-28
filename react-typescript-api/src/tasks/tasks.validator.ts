import { body, ValidationChain } from 'express-validator';

import { Status } from '../enums/Status';
import { Priority } from '../enums/Priority';

export const createValidator: ValidationChain[] = [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required')
        .trim()
        .isString()
        .withMessage('Title needs to be text'),
    body('date')
        .not()
        .isEmpty()
        .withMessage('Date is required')
        .isString()
        .withMessage('Date needs to be valid date'),
    body('description')
        .trim()
        .isString()
        .withMessage('Description needs to be text'),
    body('status')
        .trim()
        .isIn([Status.todo, Status.inProgress, Status.completed])
        .withMessage('Status needs to be todo, inProgress, or completed'),
    body('priority')
        .trim()
        .isIn([Priority.low, Priority.medium, Priority.high])
        .withMessage('Priority needs to be low, medium, or high'),
];

export const updateValidator: ValidationChain[] = [
    body('id')
        .not()
        .isEmpty()
        .withMessage('Task ID is required')
        .trim()
        .isString()
        .withMessage('Task ID needs to be valid UUID'),
    body('status')
        .trim()
        .isIn([Status.todo, Status.inProgress, Status.completed])
        .withMessage('Status needs to be todo, inProgress, or completed'),
];
