import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    key: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      minlength: 2,
      maxlength: 6, // e.g. "DEV", "WEB" (Jira style task IDs: DEV-12)
    },
    description: { type: String, default: "", maxlength: 500 },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },
    taskCounter: { type: Number, default: 0 }, // next task number (DEV-1, DEV-2...)
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Ek workspace ke andar project key unique honi chahiye
projectSchema.index({ workspace: 1, key: 1 }, { unique: true });

export default mongoose.model("Project", projectSchema);