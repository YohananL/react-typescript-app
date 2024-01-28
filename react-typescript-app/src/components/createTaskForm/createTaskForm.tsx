import React, {
    FC,
    ReactElement,
    useState,
    useEffect,
    useContext,
} from 'react';
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    LinearProgress,
    Stack,
    Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';

// Context
import { TaskStatusChangedContext } from '../../context';
// import { TaskStatusChangedContext } from '../../context/TaskStatusChangedContext/TaskStatusChangedContext';

// Components
import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskSelectField';

// Interfaces
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';

// Enums
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';

// Helpers
import { sendApiRequest } from '../../helpers/sendApiRequest';

export const CreateTaskForm: FC = (): ReactElement => {
    // Component states
    const [title, setTitle] = useState<string | undefined>(
        undefined, // default to undefined
    );
    const [description, setDescription] = useState<string | undefined>(
        undefined,
    );
    const [date, setDate] = useState<Date | null>(new Date());
    const [status, setStatus] = useState<string>(Status.todo);
    const [priority, setPriority] = useState<string>(Priority.medium);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    // Pass context
    const tasksUpdatedContext = useContext(TaskStatusChangedContext);

    // Component mutation
    const createTaskMutation = useMutation({
        mutationFn: (data: ICreateTask) =>
            sendApiRequest('http://localhost:3200/tasks', 'POST', data),
    });

    function createTaskHandler() {
        if (!title || !description || !date) {
            return;
        }

        const task: ICreateTask = {
            title, // shorthand for title: title,
            description,
            date: date.toString(),
            status,
            priority,
        };

        createTaskMutation.mutate(task);
    }

    // Manage mutation side effects
    useEffect(() => {
        if (createTaskMutation.isSuccess) {
            setShowSuccess(true);

            // Trigger the context toggle when a new task is successfully created
            tasksUpdatedContext.toggle();
        }

        const successTimeout = setTimeout(() => {
            setShowSuccess(false);
        }, 5000);

        return () => {
            // clearTimeout so the successTimeout doesn't keep invoking
            clearTimeout(successTimeout);
        };
    }, [createTaskMutation.isSuccess]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            width="100%"
            px={4}
            my={6}
        >
            {showSuccess && (
                <Alert
                    severity="success"
                    sx={{ width: '100%', marginBottom: '16px' }}
                >
                    <AlertTitle>Success</AlertTitle>
                    The task has been created successfully
                </Alert>
            )}
            <Typography mb={2} component="h2" variant="h6">
                Create A Task
            </Typography>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <TaskTitleField
                    disabled={createTaskMutation.isPending}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <TaskDescriptionField
                    disabled={createTaskMutation.isPending}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <TaskDateField
                    disabled={createTaskMutation.isPending}
                    value={date}
                    onChange={(date) => setDate(date)}
                />
                <Stack sx={{ width: '100%' }} direction="row" spacing={2}>
                    <TaskSelectField
                        label="Status"
                        name="status"
                        value={status}
                        disabled={createTaskMutation.isPending}
                        onChange={(e) => setStatus(e.target.value)}
                        items={[
                            {
                                label: Status.todo.toUpperCase(),
                                value: Status.todo,
                            },
                            {
                                label: Status.inProgress.toUpperCase(),
                                value: Status.inProgress,
                            },
                            {
                                label: Status.completed.toUpperCase(),
                                value: Status.completed,
                            },
                        ]}
                    />
                    <TaskSelectField
                        label="Priority"
                        name="priority"
                        value={priority}
                        disabled={createTaskMutation.isPending}
                        onChange={(e) => setPriority(e.target.value)}
                        items={[
                            {
                                label: Priority.low,
                                value: Priority.low,
                            },
                            {
                                label: Priority.medium,
                                value: Priority.medium,
                            },
                            {
                                label: Priority.high,
                                value: Priority.high,
                            },
                        ]}
                    />
                </Stack>
                <Button
                    disabled={
                        !title ||
                        !description ||
                        !date ||
                        !status ||
                        !priority
                    }
                    onClick={createTaskHandler}
                    variant="contained"
                    size="large"
                    fullWidth
                >
                    Create A Task
                </Button>
                {createTaskMutation.isPending && <LinearProgress />}
            </Stack>
        </Box>
    );
};
