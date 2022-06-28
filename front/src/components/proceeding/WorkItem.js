import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Modal, ButtonGroup } from "react-bootstrap";
import * as Api from '../../api';
import "./proceeding.css";
import TodoEdit from './TodoEdit';

// 할 일 목록의 각각의 할 일을 구성하는 Form
const WorkItem = ({ workitem, setPercent, itemLength, index, setWorkItemList, isEditable }) => {
    // const [check, setCheck] = useState(workitem.finish);
    const [check, setCheck] = useState();
    const [todoEdit, setTodoEdit] = useState(false);
    const [show, setShow] = useState(false);
    // 해당 할 일의 완료 여부 저장
    useEffect(() => {
        setCheck(workitem.finish);
    }, [workitem])

    // 할 일의 완료 여부가 true -> false, false -> true 로 갱신될때 실행
    useEffect(() => {
        setWorkItemList((current) => {
            const newList = [...current];
            newList[index].finish = check;
            return newList;
        })

        // 모달창으로 인해 생기는 메모리 오류를 없애기 위해 모달창을 컴포넌트가 사라지면 닫아줘야함
        return () => {
            setShow(false)
        }
    }, [check, setWorkItemList, index]);

    // 할 일 목록의 각각의 할일이 true -> false, false -> true될 때마다 해당 프로젝트의 진행률을 갱신
    const handleCheck = (e) => {
        if (check === true) {
            setPercent(current => current - (100 / itemLength))
            setCheck(current => !current);
        }
        else if (check === false) {
            setPercent(current => current + (100 / itemLength))
            setCheck(current => !current);
        }
        // 사이트를 재접속해도 진행률 유지를 위해 true -> false, false -> true될 때마다 해당 할 일의 완료 여부 DB 저장
        const data = {todo:workitem.todo, finish:!workitem.finish}
        Api.put(`todo/${workitem.id}`, data);

        setTodoEdit(false);
    }

    // 한 개의 할 일을 삭제
    const handleDelete = async () => {
        await Api.delete('todo', workitem.id);
        let del_idx = 0;
        
        // 삭제된 부분을 찾아 해당 부분을 제외하고 state에 저장
        setWorkItemList(current => {
            for (let i = 0; i < current.length; i++) {
                if (current[i].id === workitem.id) {
                    del_idx = i;
                    break;
                }
            }
            current.splice(del_idx, 1);
            const newTodo = [...current];
            return newTodo;
        })
        

        setShow(false);
    }

    return (
        <>
            {todoEdit ? <TodoEdit setTodoEdit={setTodoEdit} workitem={workitem} setWorkItemList={setWorkItemList}></TodoEdit> : (<Form>
            <Row style={{marginTop:10}}>
                <Col sm={9}>
                    <Form.Text className={check ? "checked" : undefined}>
                        {workitem.todo}
                    </Form.Text>
                </Col>
                <Col sm={3}>
                <ButtonGroup style={{ margin: 10, }} size='sm'>
                    {isEditable && (
                        <Button
                            variant="success"
                            size="sm"
                            onClick={handleCheck}
                            >
                            <span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>done</span>
                        </Button>
                    )}
                    {isEditable && (
                        <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setTodoEdit(true)}
                        >
                        <span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>edit</span>
                        </Button>
                    )}
                    {isEditable && (
                        <>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => setShow(true)}
                        >
                            <span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>delete</span>
                        </Button>
                        <Modal
                            show={show}
                            style={{zIndex:99999,}}
                        >
                        <Modal.Header>
                        <Modal.Title>해당 내용을 삭제하시겠습니까?</Modal.Title>
                        </Modal.Header>
                        <br />
                        <Modal.Footer style={{justifyContent:"center"}}>
                        <Button variant="danger" onClick={handleDelete}>
                            삭제
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={()=>setShow(false)}
                        >
                                취소
                            </Button>
                        </Modal.Footer>
                        </Modal>
                        </>
                    )}
                </ButtonGroup>

                </Col>
            </Row>
        </Form>)}
        </>
    )
}

export default WorkItem;