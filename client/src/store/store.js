import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import taskReducer from "./slices/taskSlice"
import projectReducer from "./slices/projectSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks:taskReducer,
    projects: projectReducer
  }
})

export default store