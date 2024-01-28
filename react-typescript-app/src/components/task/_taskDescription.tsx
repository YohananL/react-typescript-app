import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

// Interfaces
import { ITaskDescription } from './interfaces/ITaskDescription';

export const TaskDescription: FC<ITaskDescription> = (
    props,
): ReactElement => {
    // Destructure props
    const { description = 'Lorem ipsum dolor sit amet' } = props;

    return (
        <Box>
            <Typography>{description}</Typography>
        </Box>
    );
};

TaskDescription.propTypes = {
    description: PropTypes.string,
};
