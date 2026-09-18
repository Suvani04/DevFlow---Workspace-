import Task from "../models/Task.js";
import Project from "../models/Project.js";
import WorkspaceMember from "../models/WorkspaceMember.js";

// Helper: user workspace ka member hai ya nahi
const isMember = (workspaceId, userId) =>
  WorkspaceMember.findOne({ workspace: workspaceId, user: userId });

// POST /api/tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, projectId, priority, type, assignee, labels, dueDate } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: "title aur projectId required hain" });
    }

    // Counter atomic increment (2 log ek saath task banayein toh bhi number duplicate nahi hoga)
    const project = await Project.findByIdAndUpdate(
      projectId,
      { $inc: { taskCounter: 1 } },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project nahi mila" });

    if (!(await isMember(project.workspace, req.user._id))) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Todo column ke end mein card lagao
    const lastTask = await Task.findOne({ project: projectId, status: "todo" }).sort({ order: -1 });
    const order = lastTask ? lastTask.order + 1 : 0;

    const task = await Task.create({
      title,
      description,
      project: projectId,
      workspace: project.workspace,
      taskNumber: project.taskCounter,
      taskKey: `${project.key}-${project.taskCounter}`,
      priority,
      type,
      assignee: assignee || null,
      labels,
      dueDate,
      reporter: req.user._id,
      order,
    });

    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/tasks?projectId=xxx  (Kanban board ke liye)
export const getTasks = async (req, res) => {
  try {
    const { projectId, status, assignee } = req.query;
    if (!projectId) return res.status(400).json({ message: "projectId required hai" });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project nahi mila" });

    if (!(await isMember(project.workspace, req.user._id))) {
      return res.status(403).json({ message: "Access denied" });
    }

    const filter = { project: projectId };
    if (status) filter.status = status;
    if (assignee) filter.assignee = assignee;

    const tasks = await Task.find(filter)
      .populate("assignee", "name email avatar")
      .populate("reporter", "name email avatar")
      .sort({ status: 1, order: 1 });

    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignee", "name email avatar")
      .populate("reporter", "name email avatar")
      .populate("project", "name key");
    if (!task) return res.status(404).json({ message: "Task nahi mila" });

    if (!(await isMember(task.workspace, req.user._id))) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/tasks/:id  (title, status, priority, assignee, order etc.)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task nahi mila" });

    if (!(await isMember(task.workspace, req.user._id))) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Sirf ye fields update ho sakti hain
    const allowed = [
      "title", "description", "status", "priority",
      "type", "assignee", "labels", "dueDate", "order",
    ];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) task[field] = req.body[field];
    });

    await task.save();
    res.json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task nahi mila" });

    if (!(await isMember(task.workspace, req.user._id))) {
      return res.status(403).json({ message: "Access denied" });
    }

    await task.deleteOne();
    res.json({ message: "Task delete ho gaya" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};