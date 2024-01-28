// rootContext uses TaskStatusChangedContextProvider
// ComposeContext sets rootContext as components
import { TaskStatusChangedContextProvider } from './TaskStatusChangedContext/TaskStatusChangedContext';

export const rootContext = [TaskStatusChangedContextProvider];
