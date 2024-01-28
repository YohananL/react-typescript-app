import { Status } from '../../createTaskForm/enums/Status';
// import { TaskCounterStatusType } from '../interfaces/ITaskCounter';

export const emitCorrectLabel = (
    // status: TaskCounterStatusType,
    status: Status,
): string => {
    switch (status) {
        case Status.todo:
            return 'To Do';
        case Status.inProgress:
            return 'In Progress';
        case Status.completed:
            return 'Completed';
    }
};
