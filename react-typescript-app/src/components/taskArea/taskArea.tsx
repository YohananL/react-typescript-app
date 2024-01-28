import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { Alert, Box, Grid, LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import { useQuery, useMutation } from '@tanstack/react-query';

// Context
import { TaskStatusChangedContext } from '../../context';
// import { TaskStatusChangedContext } from '../../context/TaskStatusChangedContext/TaskStatusChangedContext';

// Components
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';

// Interfaces
import { ITaskApi } from './interfaces/ITaskApi';
import { IUpdateTask } from './interfaces/IUpdateTask';

// Enums
import { Status } from '../createTaskForm/enums/Status';

// Helpers
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { countTasks } from './helpers/countTasks';

export const TaskArea: FC = (): ReactElement => {
    const tasksUpdatedContext = useContext(TaskStatusChangedContext);

    const { error, isLoading, data, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            return await sendApiRequest<ITaskApi[]>(
                'http://localhost:3200/tasks',
                'GET',
            );
        },
    });

    // Refetch all tasks when context is updated
    // by new tasks being created or a task being marked completed
    useEffect(() => {
        refetch();
    }, [tasksUpdatedContext.updated]);

    // Update task mutation
    const updateTaskMutation = useMutation({
        mutationFn: (data: IUpdateTask) =>
            sendApiRequest('http://localhost:3200/tasks', 'PUT', data),
    });

    // Trigger the contxt toggle when a task is updated
    useEffect(() => {
        if (updateTaskMutation.isSuccess) {
            tasksUpdatedContext.toggle();
        }
    }, [updateTaskMutation.isSuccess]);

    function onStatusChangeHandler(
        id: string,
        e: React.ChangeEvent<HTMLInputElement>,
    ) {
        updateTaskMutation.mutate({
            id,
            status: e.target.checked ? Status.inProgress : Status.todo,
        });
    }

    function onMarkCompleteClickHandler(
        id: string,
        e:
            | React.MouseEvent<HTMLButtonElement>
            | React.MouseEvent<HTMLAnchorElement>,
    ) {
        updateTaskMutation.mutate({
            id,
            status: Status.completed,
        });
    }

    return (
        <Grid item md={8} px={4}>
            {' '}
            {/* Uses medium 8 and horizontal padding of 4 */}
            <Box mb={8} px={4}>
                <h2>
                    Status of Tasks on date of: {format(new Date(), 'PPP')}
                </h2>
            </Box>
            <Grid container display="flex" justifyContent="center">
                <Grid
                    item
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                    md={10}
                    xs={12}
                    mb={8}
                >
                    <TaskCounter
                        count={
                            data
                                ? countTasks(data, Status.todo)
                                : undefined
                        }
                        status={Status.todo}
                    />
                    <TaskCounter
                        count={
                            data
                                ? countTasks(data, Status.inProgress)
                                : undefined
                        }
                        status={Status.inProgress}
                    />
                    <TaskCounter
                        count={
                            data
                                ? countTasks(data, Status.completed)
                                : undefined
                        }
                        status={Status.completed}
                    />
                </Grid>
                <Grid
                    item
                    display="flex"
                    flexDirection="column"
                    md={8}
                    xs={10}
                >
                    <>
                        {error && (
                            <Alert severity="error">
                                There was an error fetching tasks
                            </Alert>
                        )}
                        {!error &&
                            Array.isArray(data) &&
                            data.length === 0 && (
                                <Alert severity="warning">
                                    There are currently no tasks to display
                                </Alert>
                            )}
                        {isLoading ? (
                            <LinearProgress />
                        ) : (
                            Array.isArray(data) &&
                            data.length > 0 &&
                            data.map((value, index) => {
                                return value.status === Status.todo ||
                                    value.status === Status.inProgress ? (
                                    <Task
                                        key={index + value.priority}
                                        id={value.id}
                                        title={value.title}
                                        description={value.description}
                                        date={new Date(value.date)}
                                        status={value.status}
                                        priority={value.priority}
                                        onStatusChange={
                                            onStatusChangeHandler
                                        }
                                        onMarkCompleteClick={
                                            onMarkCompleteClickHandler
                                        }
                                    />
                                ) : (
                                    false
                                );
                            })
                        )}
                    </>
                </Grid>
            </Grid>
        </Grid>
    );
};
