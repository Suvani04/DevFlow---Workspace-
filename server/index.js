import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './src/routes/auth.routes.js'
dotenv.config()

const app = express()
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())

app.use('/api/auth' ,authRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DevFlow running!' })
})

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ Error:', err))

app.listen(5000, () => console.log('🚀 Server on port 5000'))