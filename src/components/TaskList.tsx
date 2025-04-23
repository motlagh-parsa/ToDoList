import React from "react";
import { List, Typography } from "@mui/material";
import TaskItem from "./TaskItem";
import { Task } from "../types/task";

// Props definition for TaskList component
type TaskListProps = {
    tasks: Task[];           // Array of tasks to be displayed
    selectedCategory: string; // Category currently being filtered (or "All" if no filter)
};

/**
 * TaskList - Renders a list of tasks, grouped by category.
 * If a category is selected, it filters tasks based on that category.
 * Otherwise, all tasks are shown grouped by their category.
 */
const TaskList: React.FC<TaskListProps> = ({ tasks, selectedCategory }) => {
    // Determine if we're showing tasks from all categories or just the selected one
    const isAll = !selectedCategory || selectedCategory === "All";

    // Define categories to display (either all categories or just the selected one)
    const categoriesToShow = isAll ? ["Personal", "Work"] : [selectedCategory];

    return (
        <>
            {/* Loop through each category (either selected or all categories) */}
            {categoriesToShow.map((category) => {
                // Filter the tasks that belong to the current category
                const categoryTasks = tasks.filter((t) => t.category === category);

                // Only render this category if it has tasks
                return categoryTasks.length > 0 ? (
                    <div key={category}>
                        {/* Display the category title */}
                        <Typography variant="h6" mt={2}>
                            {category}
                        </Typography>
                        <List>
                            {/* Render each task within the current category */}
                            {categoryTasks.map((task) => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </List>
                    </div>
                ) : null; // If no tasks in this category, render nothing
            })}
        </>
    );
};

export default TaskList;
