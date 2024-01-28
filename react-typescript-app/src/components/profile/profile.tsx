import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Typography } from '@mui/material';

// type IProfile = {
//     name?: string;
// }

interface IProfile {
    name: string;
}

// Profile is a function component with type IProfile, parameters passed to it must adhere to IProfile
export const Profile: FC<IProfile> = (props): ReactElement => {
    // Destructure props
    const { name = 'YohL' } = props;

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            // sx={{
            //     display: 'flex',
            //     flexDirection: 'column',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            // }}
        >
            <Avatar
                sx={{
                    height: '96px',
                    width: '96px',
                    backgroundColor: 'primary.main',
                    marginBottom: '16px',
                }}
            >
                <Typography variant="h4" color="text.primary">
                    {`${name.substring(0, 1)}`}
                </Typography>
            </Avatar>
            <Typography variant="h6" color="text.primary">
                {`Hello there ${name} Y_Y`}
            </Typography>
            <Typography variant="body1" color="text.primary">
                Task Manager
            </Typography>
        </Box>
    );
};

Profile.propTypes = {
    name: PropTypes.string.isRequired,
};
