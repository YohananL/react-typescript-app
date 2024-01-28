import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';

// Interfaces
import { ISelectField } from './interfaces/ISelectField';

export const TaskSelectField: FC<ISelectField> = (props): ReactElement => {
    // Destructure props
    const {
        value,
        label = 'Select Box',
        name = 'selectBox',
        items = [{ value: '', label: 'Add Items' }],
        disabled = false,
        onChange = (e: SelectChangeEvent) => {
            console.log(e);
        },
    } = props;

    return (
        <FormControl fullWidth size="small">
            <InputLabel id={`${name}-id`}>{label}</InputLabel>
            <Select
                id={`${name}-id-select`}
                labelId={`${name}-id`}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                {items.map((item, index) => (
                    <MenuItem key={item.value + index} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

TaskSelectField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }).isRequired,
    ),
    disabled: PropTypes.bool,
};
