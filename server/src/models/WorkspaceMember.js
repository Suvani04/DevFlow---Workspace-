import mongoose from 'mongoose'

const workspaceMemberSchema = new mongoose.Schema({
  workspace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['OWNER', 'ADMIN', 'MEMBER'],
    default: 'MEMBER'
  }
}, { timestamps: true })

// Ek user ek workspace mein sirf ek baar ho
workspaceMemberSchema.index(
  { workspace: 1, user: 1 },
  { unique: true }
)

export default mongoose.model('WorkspaceMember', workspaceMemberSchema)