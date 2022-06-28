import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import * as Api from '../../api';
import ProjectList from './ProjectList';
import ProjectForm from './ProjectForm';

// 프로젝트를 보여주는 Card
const ProjectCard = ({ portfolioOwnerId, isEditable }) => {
    const [projectList, setProjectList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    // 프로젝트 리스트를 DB에서 가져옴
    useEffect(() => {
        Api.get('projectlist', portfolioOwnerId)
            .then(res => setProjectList(res.data));
    }, [portfolioOwnerId]);

    return (<Card style={{width:"740px"}}>
        <Card.Body>
            <Card.Title><span className="material-icons" style={{verticalAlign:"middle",}}>storage</span> 프로젝트</Card.Title>
            <ProjectList portfolioOwnerId={portfolioOwnerId} projectList={projectList} setProjectList={setProjectList} isEditable={isEditable}></ProjectList>
            {isEditable && (
                <div style={{ textAlign: "center"}}>
                    {!isEditing && <Card.Body><Button style={{borderRadius:100,}} size='sm' variant="primary" onClick={() => setIsEditing(true)}>
                        <span className="material-icons" style={{verticalAlign:'middle',fontSize:15,}}>add</span>
                    </Button></Card.Body>}
                    {isEditing && <ProjectForm setIsEditing={setIsEditing} setProjectList={setProjectList} portfolioOwnerId={portfolioOwnerId}></ProjectForm>}
                </div>
            )}
        </Card.Body>
    </Card>)
}
export default ProjectCard;