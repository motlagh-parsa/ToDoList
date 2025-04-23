import React, { useState } from "react";
import { Button, Container, Typography, Box, Chip } from "@mui/material";
import TaskList from "../components/TaskList";
import { TaskCategory } from "../types/categories";
import TaskModal from "../components/TaskModal";
import useTasks from "../hooks/useTasks";

/**
 * Home Component - Main entry for displaying and managing the user's to-do list.
 * Includes task filtering, listing, and a modal for adding new tasks.
 */
const Home = () => {
    // Access the list of tasks from the context using a custom hook
    const { tasks } = useTasks();

    // Modal state for showing/hiding the add/edit task modal
    const [openModal, setOpenModal] = useState(false);

    // Filter state to track which category is currently selected ("All", "Personal", or "Work")
    const [categoryFilter, setCategoryFilter] = useState("All");

    // Convert TaskCategory enum values into an array for rendering category filter chips
    const CATEGORIES = Object.values(TaskCategory); // e.g., ["All", "Personal", "Work"]

    // Filter tasks based on selected category
    const filteredTasks = categoryFilter === "All"
        ? tasks
        : tasks.filter(task => task.category === categoryFilter);

    return (
        <Container>
            {/* App Heading */}
            <Typography variant="h4" gutterBottom>
                To-Do List
            </Typography>

            {/* Category Filter Chips */}
            <Box display="flex" justifyContent="left" mt={2}>
                {CATEGORIES.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        clickable
                        color={categoryFilter === category ? "primary" : "default"}
                        onClick={() => setCategoryFilter(category)}
                        sx={{ margin: 1 }}
                    />
                ))}
            </Box>

            {/* Display the filtered list of tasks */}
            <TaskList tasks={filteredTasks} selectedCategory={categoryFilter} />

            {/* Button to open modal for adding a new task */}
            <Button variant="contained" onClick={() => setOpenModal(true)}>
                Add New Task
            </Button>

            {/* TaskModal handles both adding and editing tasks */}
            <TaskModal
                open={openModal}
                handleClose={() => setOpenModal(false)}
            />
        </Container>
    );
};

export default Home;
