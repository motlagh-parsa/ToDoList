# To-Do List

A to-do app in React and TypeScript: add, edit, complete and delete tasks, sort them into Personal and Work, and filter by category. Tasks are kept in the browser between visits.

## Features

- **Add, edit, complete and delete** tasks; editing happens in a modal.
- **Categories:** Personal and Work, with a filter for each and for all tasks.
- **Saved in the browser:** tasks are loaded from and written to `localStorage`.
- **Predictable state:** a single `useReducer` (`ADD_TASK`, `EDIT_TASK`, `TOGGLE_COMPLETE`, `DELETE_TASK`) shared through React Context and a `useTasks` hook.
- **Runs in Docker** with the included `Dockerfile` and `docker-compose.yml`.

## Stack

React 19 · TypeScript · MUI · React Context + `useReducer` · Docker

## Project structure

```
src/
├─ components/   TaskList, TaskItem, TaskModal
├─ context/      TaskContext — state, and persistence to localStorage
├─ hooks/        useTasks
├─ reducer/      taskReducer
├─ types/        Task, TaskCategory
└─ pages/        Home
```

## Run it locally

```bash
git clone https://github.com/motlagh-parsa/ToDoList.git
cd ToDoList
npm install
npm start          # http://localhost:3000
```

Or with Docker:

```bash
docker compose up --build    # http://localhost:3000
```

Tests: `npm test`.
