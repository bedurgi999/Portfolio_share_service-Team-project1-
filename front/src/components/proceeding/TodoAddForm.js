import React, { useState, useContext } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import * as Api from '../../api';
import { UserStateContext } from "../../App";

// 프로젝트에서 해야할 일들을 추가하는 Form
const TodoAddForm = ({ setAdd, proceeding, setWorkItemList }) => {
    const [work, setWork] = useState('');
    const userState = useContext(UserStateContext);

    // 프로젝트에서 해야 할 일에 대한 목록을 저장
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (work === '') {
            alert('할 일을 입력하세요.');
            return;
        }

        const data = {
            user_id: userState.user.id,
            proceeding_id: proceeding.id,
            todo: work,
            finish: false
        }
        const res = await Api.post('todo/create', data);

        setWorkItemList(current => {
            const newTodo = [...current];
            newTodo.push(res.data);
            return newTodo;
        })
        setAdd(false);

    }
    // 할 일 목록 추가하는 Form
    return (
        <Form style={{ margin: 10, padding: 10}} onSubmit={handleSubmit}>
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
                    <Button size='sm' variant="secondary" type="button" className="btn btn-secondary" onClick={() => setAdd(false)}>
                        취소
                    </Button>
                </Col>
            </Form.Group>

        </Form>
    )
}

export default TodoAddForm;