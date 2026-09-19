import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (workspaceId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/projects?workspaceId=${workspaceId}`);
      return data.projects;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Projects load nahi hue");
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/projects", projectData);
      return data.project;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Project create nahi hua");
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default projectSlice.reducer;