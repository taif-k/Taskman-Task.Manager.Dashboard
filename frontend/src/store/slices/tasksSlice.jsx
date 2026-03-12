import { createSlice } from "@reduxjs/toolkit";
import { initialTasks } from "../../data/tasks";

const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("currentUser")) ||
  JSON.parse(sessionStorage.getItem("currentUser"));

const getActivityUser = () => {
  const user = getCurrentUser();
  return user
    ? {
        name: user.fullName,
        email: user.email,
        avatar: user.avatar || null,
      }
    : null;
};

const saveToStorage = (state) => {
  const user = getCurrentUser();
  if (!user) return;

  const key = user.email;
  localStorage.setItem(`tasks_${key}`, JSON.stringify(state.columns));
  localStorage.setItem(
    `recentActivity_${key}`,
    JSON.stringify(state.recentActivity)
  );
};

const emptyColumns = {
  newTask: [],
  inProgress: [],
  doneTask: [],
};

const user = getCurrentUser();
const key = user?.email;
const savedTasks = JSON.parse(localStorage.getItem(`tasks_${key}`));

const initialState = {
  columns:
    savedTasks && Object.values(savedTasks).some((col) => col.length > 0)
      ? savedTasks
      : initialTasks,
  recentActivity: JSON.parse(
    localStorage.getItem(`recentActivity_${key}`)
  ) || [],
};


const addRecentActivity = (state, activity) => {
  state.recentActivity.unshift({
    ...activity,
    user: getActivityUser(),
    timestamp: Date.now(),
  });
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      const { column, task } = action.payload;
      state.columns[column].unshift(task);

      addRecentActivity(state, {
        type: "add",
        taskId: task.id,
        taskName: task.name,
        column,
        image: task.image || null,
      });

      saveToStorage(state);
    },

    editTask(state, action) {
      const { column, taskId, updates } = action.payload;
      const index = state.columns[column].findIndex((t) => t.id === taskId);

      if (index !== -1) {
        state.columns[column][index] = {
          ...state.columns[column][index],
          ...updates,
        };

        addRecentActivity(state, {
          type: "edit",
          taskId,
          taskName: state.columns[column][index].name,
          column,
          image: state.columns[column][index].image || null,
        });
      }

      saveToStorage(state);
    },

    deleteTask(state, action) {
      const { column, taskId } = action.payload;
      const deletedTask = state.columns[column].find((t) => t.id === taskId);
      state.columns[column] = state.columns[column].filter(
        (t) => t.id !== taskId
      );

      if (deletedTask) {
        addRecentActivity(state, {
          type: "delete",
          taskId,
          taskName: deletedTask.name,
          column,
          image: deletedTask.image || null,
        });
      }

      saveToStorage(state);
    },

    moveTask(state, action) {
      const { fromColumn, toColumn, activeId, overId } = action.payload;
      const sourceTasks = state.columns[fromColumn];
      const targetTasks = state.columns[toColumn];
      const sourceIndex = sourceTasks.findIndex((t) => t.id === activeId);
      if (sourceIndex === -1) return;

      const [movedTask] = sourceTasks.splice(sourceIndex, 1);
      const targetIndex = targetTasks.findIndex((t) => t.id === overId);
      if (targetIndex === -1) targetTasks.push(movedTask);
      else targetTasks.splice(targetIndex, 0, movedTask);

      addRecentActivity(state, {
        type: "move",
        taskName: movedTask.name,
        fromColumn,
        toColumn,
        image: movedTask.image || null,
      });

      saveToStorage(state);
    },

    setTasksForUser(state, action) {
      state.columns = action.payload.columns;
      state.recentActivity = action.payload.recentActivity;
    },

    resetTasks(state) {
      state.columns = emptyColumns;
      state.recentActivity = [];
    },
  },
});

export const {
  addTask,
  editTask,
  deleteTask,
  moveTask,
  setTasksForUser,
  resetTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
