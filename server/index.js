import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './src/routes/auth.routes.js'
import WorkspaceRoutes from './src/routes/workspace.routes.js'
import projectRoutes from './src/routes/project.routes.js'
import taskRoutes from './src/routes/task.routes.js'
import aiRoutes from './src/routes/ai.routes.js'

dotenv.config()

const app = express()
const allowedOrigins = [
  "http://localhost:5173",
  "https://dev-flow-workspace.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json())

app.use('/api/auth' ,authRoutes)
app.use('/api/workspaces' , WorkspaceRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/ai', aiRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DevFlow running!' })
})

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ Error:', err))

app.listen(5000, () => console.log('🚀 Server on port 5000'))