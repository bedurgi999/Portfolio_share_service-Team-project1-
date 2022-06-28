import React, { useContext, useState } from "react";
import { Button, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from '../../api';
import { UserStateContext } from "../../App";

// 프로젝트를 편집하는 Form
const ProjectEdit = ({ title, description, link, from_date, to_date, setEdit, id, setProjectList }) => {
    const userState = useContext(UserStateContext);
    // 프로젝트 편집 기능

    const [projectInfo, setProjectInfo] = useState({
        title:title,
        description:description,
        from_date:new Date(from_date),
        to_date:new Date(to_date),
        link:link
    })

    const handleOnChange = (data, name) => {
        setProjectInfo(current => ({
          ...current,
          [name] : data
        }))
    }
    // 프로젝트 내용 업데이트
    async function handleSubmit(e) {
        e.preventDefault();

        if (projectInfo.title === '') {
            alert('제목을 입력하세요.');
            return;
        }
        else if (projectInfo.description === '') {
            alert('상세내역을 입력하세요');
            return;
        }
        else if (!(projectInfo.from_date < projectInfo.to_date)) {
            alert('옳지않은 기간입니다. 다시 입력하세요.');
            return;
        }
        const data = { user_id: userState.user.id, title:projectInfo.title, description:projectInfo.description, link:projectInfo.link,
            from_date: projectInfo.from_date.getFullYear()+'-'+(projectInfo.from_date.getMonth()+1)+'-'+projectInfo.from_date.getDate(), 
            to_date: projectInfo.to_date.getFullYear()+'-'+(projectInfo.to_date.getMonth()+1)+'-'+projectInfo.to_date.getDate() 
          }
        

        const res = await Api.put(`projects/${id}`, data);

        setProjectList(current => {
            const newProject = [...current];
            for (let i = 0; i < newProject.length; i++) {
                if (newProject[i].id === id) {
                    newProject[i] = {...res.data};
                    break;
                }
            }
            return newProject;
        });
        setEdit(false);
    }

    return (
        <Form style={{ margin: 10, padding: 10, }} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    value={projectInfo.title}
                    placeholder="프로젝트 제목"
                    autoComplete="off"
                    onChange={(e) => (handleOnChange(e.target.value, 'title'))}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                    type="text"
                    value={projectInfo.description}
                    placeholder="상세내역"
                    autoComplete="off"
                    onChange={(e) => (handleOnChange(e.target.value, 'description'))} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                    type="text"
                    value={projectInfo.link}
                    placeholder="프로젝트 링크"
                    autoComplete="off"
                    onChange={(e) => (handleOnChange(e.target.value, 'link'))} />
            </Form.Group>

            <Form.Group className="mt-3 row">
                <div className="col-auto">
                    <DatePicker selected={projectInfo.from_date} onChange={date => (handleOnChange(date, 'from_date'))}></DatePicker>
                </div>
                <div className="col-auto">
                    <DatePicker selected={projectInfo.to_date} onChange={date => (handleOnChange(date, 'to_date'))}></DatePicker>
                </div>
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    <Button size='sm' variant="primary" type="submit" className="me-3 btn btn-primary">
                        확인
                    </Button>
                    <Button size='sm' variant="secondary" type="button" className="btn btn-secondary" onClick={() => setEdit(false)}>
                        취소
                    </Button>
                </Col>
            </Form.Group>

        </Form>
    )
}

export default ProjectEdit;