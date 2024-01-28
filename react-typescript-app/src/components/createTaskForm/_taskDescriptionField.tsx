import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

// Interfaces
import { ITextField } from './interfaces/ITextField';

export const TaskDescriptionField: FC<ITextField> = (
    props,
): ReactElement => {
    // Destructure props
    const { onChange = (e) => console.log(e), disabled = false } = props;

    return (
        <TextField
            id="description"
            name="description"
            label="Task Description"
            placeholder="Task Description"
            variant="outlined"
            size="small"
            multiline
            rows={4}
            fullWidth
            disabled={disabled}
            onChange={onChange}
        />
    );
};

TaskDescriptionField.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};
