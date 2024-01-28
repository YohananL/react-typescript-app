import React, { FC, ReactElement /*useState*/ } from 'react';
import PropTypes from 'prop-types';
// import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Interfaces
import { IDateField } from './interfaces/IDateField';

export const TaskDateField: FC<IDateField> = (props): ReactElement => {
    // Destructure props
    const {
        value = new Date(),
        disabled = false,
        onChange = (date) => console.log(date),
        textFieldProps = { disabled: false },
    } = props;

    // // Component state: https://mui.com/x/react-date-pickers/date-picker/#uncontrolled-vs-controlled-value
    // const [date, setDate] = useState<Date | null>(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                label="Task Date"
                format="dd/MM/yyyy"
                value={value} // value={date}
                onChange={onChange} // onChange={(newValue) => setDate(newValue)}
                disabled={disabled}
                slotProps={{ textField: textFieldProps }}
                // https://mui.com/x/migration/migration-pickers-v5/#input-renderer-required-in-v5
                // renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
};

TaskDateField.propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.instanceOf(Date),
    textFieldProps: PropTypes.object,
};
