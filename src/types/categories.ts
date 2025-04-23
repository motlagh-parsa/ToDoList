/**
 * TaskCategory - Enum to define available categories for tasks.
 * Used for filtering and organizing tasks in the UI.
 */
export enum TaskCategory {
    All = "All",           // Represents all tasks (used for filtering, not task creation)
    Personal = "Personal", // Personal tasks like errands, appointments, etc.
    Work = "Work"          // Work-related tasks such as meetings, deadlines, etc.
}
