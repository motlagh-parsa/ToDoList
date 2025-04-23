import React, { createContext, useEffect, useReducer } from "react";
import { taskReducer } from "../reducer/taskReducer";
import { Task } from "../types/task";

// Define the shape of the context's value
type TaskContextType = {
    tasks: Task[];                         // List of all tasks
    dispatch: React.Dispatch<any>;         // Dispatch function for task actions
};

// Create the context with an initial undefined value
export const TasksContext = createContext<TaskContextType | undefined>(undefined);

/**
 * TasksProvider - Wraps the app and provides task state via context.
 *
 * Loads tasks from localStorage on init and persists them on update.
 */
const TasksProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, dispatch] = useReducer(taskReducer, [], () => {
        // Load tasks from localStorage (if available) during initial render
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    // Persist tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        // Provide task state and dispatch to child components
        <TasksContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TasksContext.Provider>
    );
};

export { TasksProvider };
