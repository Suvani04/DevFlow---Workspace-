import Workspace from '../models/Workspace.js'
import WorkspaceMember from '../models/WorkspaceMember.js'
import crypto from 'crypto'

// CREATE WORKSPACE
export const createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body

    // Unique invite code banao
    const inviteCode = crypto.randomBytes(6).toString('hex')

    // Workspace banao
    const workspace = await Workspace.create({
      name,
      description,
      owner: req.user._id,
      inviteCode
    })

    // Owner ko member banao
    await WorkspaceMember.create({
      workspace: workspace._id,
      user: req.user._id,
      role: 'OWNER'
    })

    res.status(201).json({
      message: 'Workspace created!',
      workspace
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET ALL WORKSPACES (user ke)
export const getWorkspaces = async (req, res) => {
  try {
    // Pehle user ke saare workspace memberships lo
    const memberships = await WorkspaceMember.find({
      user: req.user._id
    }).populate('workspace')

    const workspaces = memberships.map(m => m.workspace)

    res.json({ workspaces })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET SINGLE WORKSPACE
export const getWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id)
      .populate('owner', 'name email avatar')

    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' })
    }

    // Members bhi lo
    const members = await WorkspaceMember.find({
      workspace: workspace._id
    }).populate('user', 'name email avatar')

    res.json({ workspace, members })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// UPDATE WORKSPACE
export const updateWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body

    const workspace = await Workspace.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    )

    res.json({ message: 'Workspace updated!', workspace })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// DELETE WORKSPACE
export const deleteWorkspace = async (req, res) => {
  try {
    await Workspace.findByIdAndDelete(req.params.id)
    await WorkspaceMember.deleteMany({ workspace: req.params.id })

    res.json({ message: 'Workspace deleted!' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// JOIN VIA INVITE CODE
export const joinWorkspace = async (req, res) => {
  try {
    const { inviteCode } = req.body

    const workspace = await Workspace.findOne({ inviteCode })
    if (!workspace) {
      return res.status(404).json({ message: 'Invalid invite code' })
    }

    // Already member hai?
    const existing = await WorkspaceMember.findOne({
      workspace: workspace._id,
      user: req.user._id
    })
    if (existing) {
      return res.status(400).json({ message: 'Already a member!' })
    }

    await WorkspaceMember.create({
      workspace: workspace._id,
      user: req.user._id,
      role: 'MEMBER'
    })

    res.json({ message: 'Joined workspace!', workspace })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}