import { Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class projectAuthService {
  // 프로젝트 추가
  static async addProject({
    user_id,
    title,
    description,
    link,
    from_date,
    to_date,
  }) {
    const user = await Project.findUserById({ user_id });
    if (user.length === 0) {
      const errorMessage = "존재하지 않는 사용자";
      return { errorMessage };
    }

    const project_id = uuidv4();

    const newProject = {
      id: project_id,
      user_id,
      title,
      description,
      link,
      from_date,
      to_date,
    };

    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }

  // 프로젝트 상세 정보 조회
  static async getProjectInfo({ project_id }) {
    const project = await Project.findByProjectId({ project_id });

    if (!project) {
      const errorMessage =
        "프로젝트가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return project;
  }

  // 유저의 전체 프로젝트 조회
  static async getProjects({ user_id }) {
    const projects = await Project.findByUserId({ user_id });
    return projects;
  }

  // 프로젝트 전체 조회(유저 상관x)
  static async getAllProject() {
    const projects = await Project.findAllProject();
    return projects;
  }
  
  // 프로젝트 수정
  static async setProject({ project_id, toUpdate }) {
    let project = await Project.findByProjectId({ project_id });

    if (!project) {
      const errorMessage =
        "프로젝트가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    // 수정해야하는 필드에 맞는 값을 업데이트
    const toUpdateField = Object.keys(toUpdate);

    toUpdateField.forEach(key => {
      if (!toUpdate[key]) delete toUpdate[key];
    });

    project = await Project.update({ project_id, toUpdate });
    return project;
  }
  
  // 프로젝트 삭제
  static async deleteProject({ project_id }) {
    const deletedProject = await Project.deleteProject({
      project_id,
    });

    if (!deletedProject) {
      const errorMessage =
        "프로젝트 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return deletedProject;
  }

  // 유저의 전체 프로젝트 삭제
  static async deleteAllProject({ user_id }) {
    const deleteProjects = await Project.deleteAll({ user_id });
    return;
  }
}

export { projectAuthService };
