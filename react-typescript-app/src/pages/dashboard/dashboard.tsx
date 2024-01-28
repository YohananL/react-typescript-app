import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';

// Components
import { TaskArea } from '../../components/taskArea/taskArea';
import { Sidebar } from '../../components/sidebar/sidebar';

export const Dashboard: FC = (): ReactElement => {
    return (
        // Set height to full viewport with no padding and margins
        <Grid container minHeight="100vh" p={0} m={0}>
            <TaskArea />
            <Sidebar />
        </Grid>
    );
};
