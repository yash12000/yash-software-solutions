import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
};

export const getProjects = async (req, res) => {
  const projects = await Project.find()
    .populate("employees")
    .populate("client");
  res.json(projects);
};

export const assignEmployee = async (req, res) => {
  const { projectId, employeeId } = req.body;

  const project = await Project.findById(projectId);
  project.employees.push(employeeId);
  await project.save();

  const updated = await Project.findById(projectId).populate("employees");
  res.json(updated);
};

export const updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const requestService = async (req, res) => {
  const project = await Project.create({
    ...req.body,
    client: req.user._id,
    status: "Pending Approval",
  });

  res.json(project);
};