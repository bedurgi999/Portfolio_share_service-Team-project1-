import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import ProceedingForm from './ProceedingForm';
import * as Api from '../../api';
import TodoListAdd from './TodoListAdd';

// 진행중인 프로젝트 목록의 전체적인 Card
const Proceeding = ({ portfolioOwnerId, isEditable }) => {
    const [isForm, setIsForm] = useState(false);

    const [proceedingList, setProceedingList] = useState([]);

    // 자신이 진행중인 프로젝트 목록을 가져옴
    useEffect(() => {
        Api.get('proceedinglist', portfolioOwnerId)
            .then(res => setProceedingList(res.data));
    }, [portfolioOwnerId]);

    // 진행중인 프로젝트 Card의 전체적인 구조
    return (
        <>
            <Card style={{width:"740px"}}>
                <Card.Body>
                    <Card.Title><span className="material-icons" style={{verticalAlign:"middle",}}>watch_later</span> 진행중인 프로젝트</Card.Title>
                    {isEditable ? (
                        <>  
                            {proceedingList.map((proceeding, index) => (
                                <TodoListAdd key={index} proceeding={proceeding} setProceedingList={setProceedingList} isEditable={isEditable}></TodoListAdd>
                            ))}
                            {isForm && <ProceedingForm setIsForm={setIsForm} portfolioOwnerId={portfolioOwnerId} setProceedingList={setProceedingList}/>}
                            <div style={{ textAlign: "center", padding:"16px" }}>
                                {!isForm && <Button variant="primary" size='sm' style={{borderRadius:100}} onClick={() => setIsForm(true)}>
                                <span className="material-icons" style={{verticalAlign:'middle',fontSize:15,}}>add</span>
                                    </Button>}
                            </div>
                        </>
                    ) : (
                        <>
                            {proceedingList.map((proceeding, index) => (
                                <TodoListAdd key={index} proceeding={proceeding} setProceedingList={setProceedingList} isEditable={isEditable}></TodoListAdd>
                            ))}
                        </>
                    )}
                </Card.Body>
            </Card>
        </>
    )
}

export default Proceeding;