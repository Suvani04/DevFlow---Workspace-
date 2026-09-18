import Project from "../models/Project.js";
import WorkspaceMember from "../models/WorkspaceMember.js";

// Helper: user workspace ka member hai ya nahi
const getMembership = (workspaceId, userId) =>
  WorkspaceMember.findOne({ workspace: workspaceId, user: userId });

// POST /api/projects
export const createProject = async (req, res) => {
  try {
    const { name, key, description, workspaceId } = req.body;

    if (!name || !key || !workspaceId) {
      return res.status(400).json({ message: "name, key aur workspaceId required hain" });
    }

    const member = await getMembership(workspaceId, req.user._id);
    if (!member) return res.status(403).json({ message: "Tum is workspace ke member nahi ho" });

    const project = await Project.create({
      name,
      key,
      description,
      workspace: workspaceId,
      lead: req.user._id,
      members: [req.user._id],
      createdBy: req.user._id,
    });

    res.status(201).json({ project });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Is workspace mein ye project key already exist karti hai" });
    }
    res.status(500).json({ message: err.message });
  }
};

// GET /api/projects?workspaceId=xxx
export const getProjects = async (req, res) => {
  try {
    const { workspaceId } = req.query;
    if (!workspaceId) return res.status(400).json({ message: "workspaceId required hai" });

    const member = await getMembership(workspaceId, req.user._id);
    if (!member) return res.status(403).json({ message: "Access denied" });

    const projects = await Project.find({ workspace: workspaceId, status: "active" })
      .populate("lead", "name email avatar")
      .sort({ createdAt: -1 });

    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("lead", "name email avatar")
      .populate("members", "name email avatar");
    if (!project) return res.status(404).json({ message: "Project nahi mila" });

    const member = await getMembership(project.workspace, req.user._id);
    if (!member) return res.status(403).json({ message: "Access denied" });

    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/projects/:id  (sirf lead)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project nahi mila" });

    if (project.lead.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Sirf project lead update kar sakta hai" });
    }

    const { name, description, status } = req.body;
    if (name) project.name = name;
    if (description !== undefined) project.description = description;
    if (status) project.status = status;

    await project.save();
    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/projects/:id  (sirf lead)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project nahi mila" });

    if (project.lead.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Sirf project lead delete kar sakta hai" });
    }

    await project.deleteOne();
    res.json({ message: "Project delete ho gaya" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};