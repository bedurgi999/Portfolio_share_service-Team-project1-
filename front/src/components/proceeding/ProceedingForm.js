import React, { useContext, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from '../../api';

import { UserStateContext } from "../../App";

// 자신이 진행중인 프로젝트를 추가하는 Form
const ProceedingForm = ({ setIsForm, portfolioOwnerId, setProceedingList }) => {

  // input에 값들을 useState를 사용해 객체로 관리
  const [proceedingInfo, setProceedingInfo] = useState({
    title:'',
    start_date:new Date(),
    end_date:new Date(),
  })

  // input에 입력하는 값들을 지속적으로 업데이트 시킴
  const handleOnChange = (data, name) => {
    setProceedingInfo(current => ({
      ...current,
      [name] : data
    }))
  }

  const userState = useContext(UserStateContext);
  // 프로젝트 리스트에 프로젝트 추가
  async function handleSubmit(e) {
    e.preventDefault();
    if (proceedingInfo.title === '') {
      alert('제목을 입력하세요.');
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
    const res = await Api.post('proceeding/create', data);
    setProceedingList(current => {
        const newProceeding = [...current];
        newProceeding.push(res.data);
        return newProceeding;
    })
    setIsForm(false);
  }

  // 프로젝트 추가 Form
  return (
    <Form style={{ margin: 10, padding: 10}} onSubmit={handleSubmit}>
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
          <Button size='sm' variant="secondary" type="button" className="btn btn-secondary" onClick={() => setIsForm(false)}>
            취소
          </Button>
        </Col>  
      </Form.Group>

    </Form>
  );
}

export default ProceedingForm;