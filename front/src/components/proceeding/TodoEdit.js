import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import * as Api from '../../api';

// 할 일 목록을 편집하는 Form
const TodoEdit = ({setTodoEdit, workitem, setWorkItemList}) => {
    const [work, setWork] = useState(workitem.todo);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (work === '') {
            alert('할 일을 입력하세요.');
            return;
        }
        const data = {
            todo:work,
            finish:workitem.finish,
        };
        const res = await Api.put(`todo/${workitem.id}`, data);
        // 편집한 부분을 찾아 업데이트
        setWorkItemList(current => {
            const newTodo = [...current];
            for (let i = 0; i < newTodo.length; i++) {
                if (newTodo[i].id === workitem.id) {
                    newTodo[i] = {...res.data};
                    break;
                }
            }
            return newTodo;
        });
        setTodoEdit(false);
    }

    return (
        <Form style={{ margin: 10, padding: 10}} onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                    type="text"
                    value={work}
                    placeholder="할 일"
                    autoComplete="off"
                    onChange={(e) => setWork(e.target.value)}
                />
            </Form.Group>
            <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                    <Button size='sm' variant="primary" type="submit" className="me-3 btn btn-primary">
                        확인
                    </Button>
                    <Button size='sm' variant="secondary" type="button" className="btn btn-secondary" onClick={() => setTodoEdit(false)}>
                        취소
                    </Button>
                </Col>
            </Form.Group>
        </Form>
    )
}
export default TodoEdit;