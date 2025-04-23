/**
 * Task - Interface representing a single to-do task.
 */
export interface Task {
    id: string;         // Unique identifier for the task (typically a timestamp or UUID)
    title: string;      // Description or title of the task
    category: string;   // Category of the task (e.g., "Personal", "Work")
    completed: boolean; // Completion status of the task (true if done)
}
