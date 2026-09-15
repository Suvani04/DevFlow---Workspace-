import express from 'express'
import {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace,
  joinWorkspace
} from '../controllers/workspace.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

// Sab routes protected hain
router.use(protect)

router.post('/', createWorkspace)
router.get('/', getWorkspaces)
router.get('/:id', getWorkspace)
router.put('/:id', updateWorkspace)
router.delete('/:id', deleteWorkspace)
router.post('/join', joinWorkspace)

export default router