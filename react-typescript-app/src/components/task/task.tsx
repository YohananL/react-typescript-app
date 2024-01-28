import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

// Components
import { TaskHeader } from './_taskHeader';
import { TaskDescription } from './_taskDescription';
import { TaskFooter } from './_taskFooter';

// Interfaces
import { ITask } from './interfaces/ITask';

// Enums
import { Priority } from '../createTaskForm/enums/Priority';
import { Status } from '../createTaskForm/enums/Status';

// Helpers
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';

export const Task: FC<ITask> = (props): ReactElement => {
    const {
        id,
        title = 'Default Title',
        date = new Date(),
        description = 'Lorem ipsum dolor sit amet',
        onStatusChange = (e) => console.log(e),
        onMarkCompleteClick = (e) => console.log(e),
        priority = Priority.high,
        status = Status.completed,
    } = props;

    return (
        <Box
            display="flex"
            width="100%"
            justifyContent="flex-start"
            flexDirection="column"
            mb={4}
            p={2}
            sx={{
                width: '100%',
                backgroundColor: 'background.paper',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: renderPriorityBorderColor(priority),
            }}
        >
            <TaskHeader title={title} date={date} />
            <TaskDescription description={description} />
            <TaskFooter
                id={id}
                status={status}
                onStatusChange={onStatusChange}
                onMarkCompleteClick={onMarkCompleteClick}
            />
        </Box>
    );
};

Task.propTypes = {
    title: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    onStatusChange: PropTypes.func,
    onMarkCompleteClick: PropTypes.func,
    priority: PropTypes.string,
    status: PropTypes.string,
};
