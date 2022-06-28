import React, {useEffect} from "react";
import ProjectElement from './ProjectElement';
import * as Api from "../../api";

const ProjectList = ({ portfolioOwnerId, projectList, setProjectList, isEditable }) => {

    useEffect(() => {
        Api.put(`users/${portfolioOwnerId}`, {projectNum: projectList.length});
    },[portfolioOwnerId, projectList])

    return (
        projectList.map((project, index) => (
            <ProjectElement key={index} project={project} isEditable={isEditable} setProjectList={setProjectList}></ProjectElement>
        ))
    );
}

export default ProjectList;
