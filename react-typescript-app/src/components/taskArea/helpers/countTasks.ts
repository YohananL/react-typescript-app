import { ITaskApi } from '../interfaces/ITaskApi';
// import { TaskCounterStatusType } from './../../taskCounter/interfaces/ITaskCounter';

import { Status } from '../../createTaskForm/enums/Status';

export const countTasks = (
    tasks: ITaskApi[],
    // status: TaskCounterStatusType,
    status: Status,
): number => {
    if (!Array.isArray(tasks)) {
        return 0;
    }

    const totalTasks = tasks.filter((task) => {
        return task.status === status;
    });

    return totalTasks.length;
};
