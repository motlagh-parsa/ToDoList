import {Task} from "../types/task";

// Define the shape of actions that the reducer will handle.
type Action =
    | { type: "ADD_TASK"; payload: Task }        // Action to add a new task
    | { type: "DELETE_TASK"; payload: string }   // Action to delete a task by ID
    | { type: "TOGGLE_COMPLETE"; payload: string } // Action to toggle the completion status of a task
    | { type: "EDIT_TASK"; payload: Task };      // Action to edit an existing task

/**
 * taskReducer - A function that handles the task-related state updates.
 * It receives the current state (tasks) and an action to modify that state.
 * The reducer returns the updated state based on the type of action.
 */
export const taskReducer = (state: Task[], action: Action): Task[] => {
    // A switch statement to handle different action types
    switch (action.type) {
        // ADD_TASK: Add a new task to the state
        case "ADD_TASK":
            // Add the new task (payload) to the end of the current state array
            return [...state, action.payload];

        // DELETE_TASK: Remove a task by its ID
        case "DELETE_TASK":
            // Filter out the task that matches the provided ID (action.payload)
            return state.filter(task => task.id !== action.payload);

        // TOGGLE_COMPLETE: Toggle the completion status of a task
        case "TOGGLE_COMPLETE":
            // Map over all tasks, and for the task that matches the ID (action.payload), toggle the 'completed' flag
            return state.map(task =>
                task.id === action.payload ? {...task, completed: !task.completed} : task
            );

        // EDIT_TASK: Replace an existing task with the updated version
        case "EDIT_TASK":
            // Map over all tasks, and if the task ID matches the payload's ID, replace the old task with the updated one
            return state.map(task =>
                task.id === action.payload.id ? action.payload : task
            );

        // Default case: Return the current state unchanged if no valid action is passed
        default:
            return state;
    }
};
