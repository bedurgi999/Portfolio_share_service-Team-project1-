import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, Button, Card, ProgressBar, Container, Modal, ButtonGroup } from "react-bootstrap";
import * as Api from '../../api';
import ProceedingEdit from './ProceedingEdit';
import "./proceeding.css";

import TodoAddForm from './TodoAddForm';
import WorkItem from './WorkItem';

// 진행중인 프로젝트 Card
const TodoListAdd = ({ proceeding, setProceedingList, isEditable }) => {
    const [isWork, setIsWork] = useState(false);
    const [add, setAdd] = useState(false);
    const [workItemList, setWorkItemList] = useState([]);
    const [percent, setPercent] = useState(0);
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    
    // 진행 중인 프로젝트가 삭제되면 해당 프로젝트 안의 할 일 목록도 같이 지워줌
    const handleDelete = async () => {
        await Api.delete('proceedingtodo', proceeding.id);
        await Api.delete('proceedings', proceeding.id);
        let del_idx = 0;
        setProceedingList(current => {
            for (let i = 0; i < current.length; i++) {
                if (current[i].id === proceeding.id) {
                    del_idx = i;
                    break;
                }
            }
            current.splice(del_idx, 1);
            const newProceeding = [...current];
            return newProceeding;
        })
        setWorkItemList([]);

        setShow(false);
    }
    // 해당 프로젝트의 할 일 목록을 읽어옴
    useEffect(() => {
        Api.get('todolist', proceeding.id)
            .then(res => {
                setWorkItemList(res.data)
            });
        return () => {
            setShow(false);
        }
    }, [proceeding.id])

    // 할 일 목록의 개수를 계산
    const itemLength = useMemo(() => {
        return workItemList.length;
    }, [workItemList]);

    // 할 일 목록을 읽어오고 해당 할 일이 완료된 상태인지 확인
    useEffect(() => {
        let count = 0;
        for (let i = 0; i < workItemList.length; i++) {
            if (workItemList[i].finish === true) {
                count += 1;
            }
        }
        setPercent(0 + (100 / workItemList.length) * count);
    }, [workItemList])

    return (
        <>
            <Container style={{padding: 10, margin:"10px 0", borderBottom: "rgba(70, 65, 65, 0.2) dotted"}}>
                <Row>
                    {edit ? <ProceedingEdit proceeding={proceeding} setEdit={setEdit} setProceedingList={setProceedingList}></ProceedingEdit> : (
                        <>
                            <Col sm={9}>
                                <Card.Subtitle>{percent === 100 ? `${proceeding.title}(완료)` : proceeding.title}</Card.Subtitle>
                                <Card.Text className="text-muted">{`${proceeding.start_date} ~ ${proceeding.end_date}`}</Card.Text>
                            </Col>
                            <Col sm={3}>
                                <ButtonGroup style={{ margin: 10, }} size='sm'>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => setIsWork(current => !current)}
                                    >
                                        <span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>library_add_check</span>
                                    </Button>
                                    {isEditable && (
                                        <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => setEdit(true)}
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
                        </>
                    )}
                </Row>
                <ProgressBar style={{ marginTop: 10 }} animated now={percent} label={`${percent}%`} variant={percent === 100 ? "success" : ""} />
                {isWork ? <> 
                    {workItemList.length > 0 ? workItemList.map((workitem, index) => <WorkItem key={index} workitem={workitem} setPercent={setPercent} itemLength={itemLength} index={index} setWorkItemList={setWorkItemList} isEditable={isEditable}></WorkItem>) :
                    <div style={{ textAlign: "center", marginTop: 10 }}>
                        <p>할 일이 없습니다.</p>
                    </div>}
                    {add && <TodoAddForm setAdd={setAdd} proceeding={proceeding} setWorkItemList={setWorkItemList}></TodoAddForm>}
                    <div style={{ textAlign: "center", marginTop: 10 }}><Card.Body>{isEditable && <Button size='sm' variant="secondary" style={{borderRadius:100,}} onClick={() => setAdd(true)}>+</Button>}</Card.Body></div>
                    </> : <></>}
            </Container>
        </>
    )
}

export default TodoListAdd;
