import React, { useContext, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from '../../api';

import { UserStateContext } from "../../App";

// 진행 중인 프로젝트 편집 form
const ProceedingEdit = ({proceeding, setEdit, setProceedingList}) => {
    // 편집 form이 열렸을때 기존의 데이터를 input 창에 보여줌
    const [proceedingInfo, setProceedingInfo] = useState({
        title: proceeding.title,
        start_date: new Date(proceeding.start_date),
        end_date: new Date(proceeding.end_date),
    })
    const userState = useContext(UserStateContext);

    // input 창에 값을 입력했을때 지속적으로 업데이트 시킴
    const handleOnChange = (data, name) => {
        setProceedingInfo(current => ({
            ...current,
            [name]: data
        }))
    }

    // 편집을 완료하고 저장할때 내용이 채워져있는지, 기간을 제대로 설정했는지 확인
    // 확인 후 데이터를 저장 후 리렌더링
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (proceedingInfo.title === '') {
            alert('프로젝트 이름을 입력하세요.');
            return;
        }
        else if (!(proceedingInfo.start_date < proceedingInfo.end_date)) {
            alert('옳지않은 기간입니다. 다시 입력하세요.');
            return;
        }
        const data = { user_id: userState.user.id, title:proceedingInfo.title,
            start_date: proceedingInfo.start_date.getFullYear()+'-'+(proceedingInfo.start_date.getMonth()+1)+'-'+proceedingInfo.start_date.getDate(), 
            end_date: proceedingInfo.end_date.getFullYear()+'-'+(proceedingInfo.end_date.getMonth()+1)+'-'+proceedingInfo.end_date.getDate() 
        }
        

        const res = await Api.put(`proceedings/${proceeding.id}`, data);

        setProceedingList(current => {
            const newProceeding = [...current];
            for (let i = 0; i < newProceeding.length; i++) {
                if (newProceeding[i].id === proceeding.id) {
                    newProceeding[i] = {...res.data};
                    break;
                }
            }
            return newProceeding;
        });
        setEdit(false);
    }

    // 편집 form의 전체적인 구조
    return (
        <Form style={{ margin: 10, padding: 10, width:"740px"}} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              value={proceedingInfo.title}
              placeholder="프로젝트 제목"
              autoComplete="off"
              onChange={(e) => (handleOnChange(e.target.value, 'title'))}
            />
          </Form.Group>
    
          <Form.Group className="mt-3 row">
            <div className="col-auto">
              <DatePicker selected={proceedingInfo.start_date} onChange={date => (handleOnChange(date, 'start_date'))}></DatePicker>
            </div>
            <div className="col-auto">
              <DatePicker selected={proceedingInfo.end_date} onChange={date => (handleOnChange(date, 'end_date'))}></DatePicker>
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
      );
}

export default ProceedingEdit