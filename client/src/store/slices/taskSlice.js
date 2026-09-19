import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (projectId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/tasks?projectId=${projectId}`);
      return data.tasks;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Tasks load nahi hue");
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/tasks", taskData);
      return data.task;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Task create nahi hua");
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/tasks/${id}`, updates);
      return data.task;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Task update nahi hua");
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    // Drag ke turant baad UI update (server response ka wait nahi)
    moveTaskLocal: (state, action) => {
      const { id, status, order } = action.payload;
      const task = state.items.find((t) => t._id === id);
      if (task) {
        task.status = status;
        task.order = order;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const i = state.items.findIndex((t) => t._id === action.payload._id);
        if (i !== -1) state.items[i] = { ...state.items[i], ...action.payload };
      });
  },
});

export const { moveTaskLocal } = taskSlice.actions;
export default taskSlice.reducer;