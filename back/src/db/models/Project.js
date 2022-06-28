import { ProjectModel } from "../schemas/project";
import { UserModel } from "../schemas/user";

class Project {
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  static async findUserById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findByProjectId({ project_id }) {
    const project = await ProjectModel.findOne({ id: project_id }).populate('user', {name: 1, job: 1, _id: 0}).populate('likes');
    return project;
  }

  static async update({ project_id, toUpdate }) {
    const filter = { id: project_id };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedProject;
  }

  static async findByUserId({ user_id }) {
    const projects = await ProjectModel.find({ user_id }).populate('likes');
    return projects;
  }

  static async findAllProject() {
    const projects = 
      await ProjectModel.find({})
                        .populate('user', {name: 1, job: 1, _id: 0})
                        .populate('likes');
    return projects;
  }

  static async deleteProject({ project_id }) {
    const deletedProject = await ProjectModel.deleteOne({
      id: project_id,
    });
    return deletedProject;
  }

  static async deleteAll({ user_id }) {
    const deletedProjects = await ProjectModel.deleteMany({ user_id: user_id });
    return deletedProjects;
  }
}

export { Project };
