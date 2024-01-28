import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';

// Components
import { Profile } from '../../components/profile/profile';
import { CreateTaskForm } from '../../components/createTaskForm/createTaskForm';

export const Sidebar: FC = (): ReactElement => {
    return (
        <Grid
            item
            md={4}
            sx={{
                // Uses medium 4 for a total of 12 (max grid size) and sx for css
                height: '100vh',
                position: 'fixed',
                right: 0,
                top: 0,
                width: '100%',
                backgroundColor: 'background.paper',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Profile name="Yohanan" />
            <CreateTaskForm />
        </Grid>
    );
};
