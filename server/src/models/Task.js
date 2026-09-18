import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, default: "", maxlength: 5000 },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },

    // Jira style ID: DEV-1, DEV-2...
    taskNumber: { type: Number, required: true },
    taskKey: { type: String, required: true }, // "DEV-1"

    status: {
      type: String,
      enum: ["todo", "in_progress", "in_review", "done"],
      default: "todo",
      index: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    type: {
      type: String,
      enum: ["task", "bug", "feature", "improvement"],
      default: "task",
    },

    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    labels: [{ type: String, trim: true }],
    dueDate: { type: Date, default: null },

    // Kanban column ke andar card ki position (drag & drop ke liye)
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Ek project mein taskNumber unique
taskSchema.index({ project: 1, taskNumber: 1 }, { unique: true });
// Kanban board fast load ke liye
taskSchema.index({ project: 1, status: 1, order: 1 });

export default mongoose.model("Task", taskSchema);