import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from "@mui/material";
import { Task } from "../types/task";
import useTasks from "../hooks/useTasks";

// Props for the TaskModal component
type TaskModalProps = {
    open: boolean; // Determines if the modal is visible
    handleClose: () => void; // Callback to close the modal
    taskToEdit?: Task | null; // Task to edit, or null if it's in "add" mode
};

/**
 * TaskModal - A modal component used to either add a new task or edit an existing one.
 * It handles both the display of the form and form validation for the task title.
 */
const TaskModal: React.FC<TaskModalProps> = ({ open, handleClose, taskToEdit }) => {
    // Determine if we are in edit mode by checking if a taskToEdit is passed in
    const isEditMode = !!taskToEdit;
    const { dispatch } = useTasks();

    // State variables to manage form input values and validation
    const [title, setTitle] = useState("");  // Title of the task (input field)
    const [category, setCategory] = useState("Personal"); // Task category
    const [titleError, setTitleError] = useState(false); // Error state for title input

    // When the modal opens, populate fields with data if editing, or reset for new task
    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title); // Set title for editing
            setCategory(taskToEdit.category); // Set category for editing
        } else {
            setTitle(""); // Clear title for new task
            setCategory("Personal"); // Set default category for new task
        }
        setTitleError(false); // Reset the error state when the modal is opened
    }, [taskToEdit, open]);

    // Handler for saving the task (either adding or editing)
    const handleSave = () => {
        if (!title.trim()) {
            // If title is empty, show error message
            setTitleError(true);
            return; // Prevent saving if title is empty
        }

        if (isEditMode) {
            // If in edit mode, dispatch the action to edit the task
            dispatch({
                type: "EDIT_TASK",
                payload: {
                    ...taskToEdit, // Keep the original task properties
                    title, // Update title
                    category // Update category
                }
            });
        } else {
            // If in add mode, dispatch the action to add a new task
            dispatch({
                type: "ADD_TASK",
                payload: {
                    id: Date.now().toString(), // Generate a new unique ID
                    title, // Set the task title
                    category, // Set the task category
                    completed: false // New task is initially not completed
                }
            });
        }

        handleClose(); // Close the modal after saving the task
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditMode ? "Edit Task" : "Add New Task"}</DialogTitle>
            <DialogContent>
                {/* Title Input Field */}
                <TextField
                    autoFocus
                    fullWidth
                    label="Task Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value); // Update title on change
                        if (titleError) setTitleError(false); // Clear error if title changes
                    }}
                    error={titleError} // Show error if title is invalid
                    helperText={titleError ? "Title is required" : ""} // Display error message
                    sx={{ mt: 1, mb: 2 }}
                    required // Title field is required
                />
                {/* Category Selection Field */}
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)} // Update category on change
                    >
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="Work">Work</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                {/* Cancel Button */}
                <Button onClick={handleClose}>Cancel</Button>
                {/* Save Button */}
                <Button onClick={handleSave} variant="contained">
                    {isEditMode ? "Save Changes" : "Add Task"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskModal;
