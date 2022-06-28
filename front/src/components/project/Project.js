import React from "react";
import ProjectCard from './ProjectCard';

// 프로젝트 카테고리를 구성하는 컴포넌트
const Project = ({portfolioOwnerId, isEditable}) => {
    return (
        <>
            <ProjectCard portfolioOwnerId={portfolioOwnerId} isEditable={isEditable}></ProjectCard>
        </>
    )
}

export default Project;