# Task Manager App

A React-based **Task Manager / Kanban Board** application built with **Vite**, **React-Bootstrap**, **Redux Toolkit**, and **@dnd-kit** for drag-and-drop functionality. Users can create, edit, move, and delete tasks across multiple columns, with support for images, comments, and labels.

## Features

### Authentication Forms
- **Sign In**
- **Sign Up**
- Form validation and state handling

### Task Board
- Kanban-style board with columns: **New Task**, **In Progress**, **Done Task**
- Drag-and-drop tasks between columns
- Add, edit, delete tasks
- Upload images per task
- Task progress tracking with progress bars

### Recent Activity
- Shows recent actions like added, edited, moved, or deleted tasks

### Task Details Modal
- View full task details including image, description, and comments

### Responsive Design
- Built using **React-Bootstrap** components

### Redux Toolkit
- State management for tasks and recent activity

### Performance Optimizations
- `React.memo`, `useCallback`, and `useMemo` to minimize unnecessary re-renders
