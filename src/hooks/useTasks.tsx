import { useContext } from "react";
import { TasksContext } from "../context/TaskContext";

/**
 * Custom Hook: `useTasks`
 *
 * This custom hook is used to access the `TasksContext` in any component
 * that is wrapped inside a `TaskProvider`. It provides access to the `tasks`
 * and `dispatch` functions, which are used for managing the state of tasks
 * and dispatching actions to the reducer.
 *
 * If the hook is used outside of a `TaskProvider`, it will throw an error.
 */
const useTasks = () => {
    // Access the context using `useContext` to get the task-related data (tasks and dispatch function)
    const context = useContext(TasksContext);

    // If `context` is `undefined`, it means `useTasks` is being used outside of the `TaskProvider`
    // In that case, throw an error to ensure proper usage
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }

    // Return the context so that any component using this hook can access `tasks` and `dispatch`
    return context;
};

export default useTasks;
