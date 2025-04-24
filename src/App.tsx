import {TasksProvider} from "./context/TaskContext";
import Home from './pages/Home';
import {CssBaseline, Container} from '@mui/material';

/**
 * App Component - The root component of the application.
 * Wraps the entire app in the TasksProvider context and sets up base layout/styling.
 */
function App() {
    return (
        // Provide global task state to all components via context
        <TasksProvider>

            {/* Normalize default CSS and apply MUI's baseline styling */}
            <CssBaseline/>

            {/* Container provides horizontal padding and centers content */}
            <Container maxWidth="md" sx={{paddingTop: 4}}>
                {/* Main page component where tasks are managed */}
                <Home/>
            </Container>

        </TasksProvider>
    );
}

export default App;
