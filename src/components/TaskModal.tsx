import React, { useState, useEffect, useRef } from "react";
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
    open: boolean;              // Whether the modal is visible
    handleClose: () => void;    // Callback to close the modal
    taskToEdit?: Task | null;   // If present, modal is in edit mode
};

/**
 * TaskModal - A modal for adding or editing tasks.
 * Handles form state, input validation, and keyboard accessibility (Enter to save).
 */
const TaskModal: React.FC<TaskModalProps> = ({ open, handleClose, taskToEdit }) => {
    const isEditMode = !!taskToEdit;               // Determine if we're editing or adding
    const { dispatch } = useTasks();               // Get dispatch from task context

    const [title, setTitle] = useState("");        // State for task title
    const [category, setCategory] = useState("Personal"); // State for task category
    const [titleError, setTitleError] = useState(false);  // Validation state for title input

    const inputRef = useRef<HTMLInputElement>(null);      // Ref to the title input for focusing

    // Populate fields when editing, or reset when adding
    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setCategory(taskToEdit.category);
        } else {
            setTitle("");
            setCategory("Personal");
        }
        setTitleError(false); // Reset error state on open
    }, [taskToEdit, open]);

    // Focus the title input field once the modal is open (after render delay)
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                inputRef.current?.focus(); // Ensure field is rendered before focusing
            }, 100);
        }
    }, [open]);

    // Save task handler for both add and edit modes
    const handleSave = () => {
        if (!title.trim()) {
            setTitleError(true); // Show error if title is empty
            return;
        }

        if (isEditMode) {
            // Update existing task
            dispatch({
                type: "EDIT_TASK",
                payload: {
                    ...taskToEdit,
                    title,
                    category
                }
            });
        } else {
            // Add new task with a unique ID
            dispatch({
                type: "ADD_TASK",
                payload: {
                    id: Date.now().toString(),
                    title,
                    category,
                    completed: false
                }
            });
        }

        handleClose(); // Close modal after saving
    };

    // Listen for Enter key to trigger save
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent default form submission
            handleSave();       // Trigger save logic
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditMode ? "Edit Task" : "Add New Task"}</DialogTitle>
            <DialogContent>
                {/* Task Title Input Field */}
                <TextField
                    inputRef={inputRef} // Used to set focus on open
                    fullWidth
                    label="Task Title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (titleError) setTitleError(false); // Clear error on input
                    }}
                    onKeyDown={handleKeyPress} // Listen for Enter key
                    error={titleError}
                    helperText={titleError ? "Title is required" : ""}
                    sx={{ mt: 1, mb: 2 }}
                    required
                />

                {/* Task Category Selector */}
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        label="Category"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="Personal">Personal</MenuItem>
                        <MenuItem value="Work">Work</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">
                    {isEditMode ? "Save Changes" : "Add Task"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskModal;
