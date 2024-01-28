import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Typography } from '@mui/material';

// Interfaces
import { ITaskCounter } from './interfaces/ITaskCounter';

// Enums
import { Status } from '../createTaskForm/enums/Status';

// Helpers
import { emitCorrectBorderColor } from './helpers/emitCorrectBorderColor';
import { emitCorrectLabel } from './helpers/emitCorrectLabel';

export const TaskCounter: FC<ITaskCounter> = (props): ReactElement => {
    // Destructure props
    const { status = Status.completed, count = 0 } = props;

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Avatar
                sx={{
                    backgroundColor: 'transparent',
                    border: '5px solid',
                    height: '96px',
                    width: '96px',
                    marginBottom: '16px',
                    borderColor: emitCorrectBorderColor(status),
                }}
            >
                <Typography color="#ffffff" variant="h4">
                    {count}
                </Typography>
            </Avatar>
            <Typography
                color="#ffffff"
                fontSize="20px"
                fontWeight="bold"
                variant="h5"
            >
                {emitCorrectLabel(status)}
            </Typography>
        </Box>
    );
};

TaskCounter.propTypes = {
    count: PropTypes.number,
    status: PropTypes.oneOf([
        Status.todo,
        Status.inProgress,
        Status.completed,
    ]),
};
