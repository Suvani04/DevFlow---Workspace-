import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './src/routes/auth.routes.js'
import WorkspaceRoutes from './src/routes/workspace.routes.js'
import projectRoutes from './src/routes/project.routes.js'
import taskRoutes from './src/routes/task.routes.js'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth' ,authRoutes)
app.use('/api/workspaces' , WorkspaceRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DevFlow running!' })
})

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ Error:', err))

app.listen(5000, () => console.log('🚀 Server on port 5000'))