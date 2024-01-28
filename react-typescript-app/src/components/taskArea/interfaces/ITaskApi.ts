import { Status } from '../../createTaskForm/enums/Status';
import { Priority } from '../../createTaskForm/enums/Priority';

export interface ITaskApi {
    id: string;
    date: string;
    title: string;
    description: string;
    status: `${Status}`; // `${}` indicates a string union of all values in the enum
    priority: `${Priority}`;
}
