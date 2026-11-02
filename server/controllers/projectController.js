const Project = require('../models/Project');

// @desc    获取所有项目 (公开)
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('user', 'username');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    获取单个项目 (公开)
// @route   GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('user', 'username');
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    创建新项目 (受保护)
// @route   POST /api/projects
const createProject = async (req, res) => {
  const { title, description, imageUrl, repoUrl, liveUrl } = req.body;

  try {
    const project = new Project({
      title,
      description,
      imageUrl,
      repoUrl,
      liveUrl,
      user: req.user._id, // 关联到当前登录的用户
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    更新项目 (受保护)
// @route   PUT /api/projects/:id
const updateProject = async (req, res) => {
  const { title, description, imageUrl, repoUrl, liveUrl } = req.body;

  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.imageUrl = imageUrl || project.imageUrl;
      project.repoUrl = repoUrl || project.repoUrl;
      project.liveUrl = liveUrl || project.liveUrl;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    删除项目 (受保护)
// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await Project.deleteOne({ _id: req.params.id });
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};