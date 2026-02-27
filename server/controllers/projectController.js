import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.json(project);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("client")
      .populate("employees");

    res.json(projects);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const assignEmployee = async (req, res) => {
  try {
    const { projectId, employeeId } = req.body;

    if (!projectId || !employeeId) {
      return res.status(400).json("Missing data");
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json("Project not found");
    }

    if (!project.employees.includes(employeeId)) {
      project.employees.push(employeeId);
    }

    await project.save();

    const updated = await Project.findById(projectId)
      .populate("employees");

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

export const requestService = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      client: req.user.id,
      status: "Pending Approval"
    });

    res.json(project);
  } catch (err) {
    res.status(500).json(err.message);
  }
};