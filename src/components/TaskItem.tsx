import React, {useState} from "react";
import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemText
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {Task} from "../types/task";
import TaskModal from "./TaskModal";
import useTasks from "../hooks/useTasks";

// Props definition for the TaskItem component
type TaskItemProps = {
    task: Task; // Single task object to be rendered
};

/**
 * TaskItem - Renders a single to-do task item.
 * Includes actions to toggle completion, edit, and delete the task.
 */
const TaskItem: React.FC<TaskItemProps> = ({task}) => {
    const {dispatch} = useTasks(); // Access global dispatch from context
    const [openModal, setOpenModal] = useState(false); // Local state for edit modal visibility

    // Toggle the task's completed state
    const toggleComplete = () => {
        dispatch({type: "TOGGLE_COMPLETE", payload: task.id});
    };

    // Remove the task from the list
    const deleteTask = () => {
        dispatch({type: "DELETE_TASK", payload: task.id});
    };

    // Show the task editing modal
    const openEdit = () => setOpenModal(true);

    // Close the task editing modal
    const closeEdit = () => setOpenModal(false);

    return (
        <>
            <ListItem
                divider
                secondaryAction={
                    <>
                        {/* Edit button: opens TaskModal in edit mode */}
                        <IconButton edge="end" onClick={openEdit}>
                            <EditIcon/>
                        </IconButton>

                        {/* Delete button: removes task */}
                        <IconButton edge="end" onClick={deleteTask}>
                            <DeleteIcon/>
                        </IconButton>
                    </>
                }
            >
                {/* Checkbox to toggle task completion */}
                <Checkbox checked={task.completed} onChange={toggleComplete}/>

                {/* Displays task title and category */}
                <ListItemText
                    primary={task.title}
                    secondary={task.category}
                    sx={{
                        textDecoration: task.completed ? "line-through" : "none",
                        opacity: task.completed ? 0.6 : 1,
                    }}
                />
            </ListItem>

            {/* Reusable modal for both add/edit mode; passed taskToEdit here */}
            <TaskModal
                open={openModal}
                handleClose={closeEdit}
                taskToEdit={task}
            />
        </>
    );
};

export default TaskItem;
