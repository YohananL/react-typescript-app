import React, { FC, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { customTheme } from './theme/muiTheme';

// Context
import ComposeContext from './context/Compose.context';
import { rootContext } from './context/root.context';

// Dashboard
import { Dashboard } from './pages/dashboard/dashboard';

// Create a client
const queryClient = new QueryClient();

// App is of type FC and returns a ReactElement
const App: FC = (): ReactElement => {
    return (
        <QueryClientProvider client={queryClient}>
            <ComposeContext components={rootContext}>
                <ThemeProvider theme={customTheme}>
                    <CssBaseline />
                    <Dashboard />
                </ThemeProvider>
            </ComposeContext>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
