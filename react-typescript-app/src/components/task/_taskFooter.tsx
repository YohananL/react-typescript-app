import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, FormControlLabel, Switch } from '@mui/material';

// Enums
import { Status } from '../createTaskForm/enums/Status';

// Interfaces
import { ITaskFooter } from './interfaces/ITaskFooter';

export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
    // Destructure props
    const {
        id,
        status,
        onStatusChange = (e) => console.log(e),
        onMarkCompleteClick = (e) => console.log(e),
    } = props;

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
        >
            <FormControlLabel
                label="In Progress"
                control={
                    <Switch
                        onChange={(e) => onStatusChange(id, e)}
                        color="warning"
                        defaultChecked={status === Status.inProgress}
                    />
                }
            />
            <Button
                onClick={(e) => onMarkCompleteClick(id, e)}
                variant="contained"
                color="success"
                size="small"
                sx={{ color: '#ffffff' }}
            >
                Mark Complete
            </Button>
        </Box>
    );
};

TaskFooter.propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    onStatusChange: PropTypes.func,
    onMarkCompleteClick: PropTypes.func,
};
