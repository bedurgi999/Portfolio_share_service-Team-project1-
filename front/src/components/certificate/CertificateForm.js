import React, { useContext, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from '../../api';

import { UserStateContext } from "../../App";

// 자격증 추가 Form
const CertificateForm = ({ setIsEditing, setCertificateList, portfolioOwnerId  }) => {
  const [certificateInfo, setCertificateInfo] = useState({
    title:'',
    description:'',
    when_date:new Date(),
  })

  const handleOnChange = (data, name) => {
    setCertificateInfo(current => ({
      ...current,
      [name] : data
    }))
  }


  const userState = useContext(UserStateContext);
  // 프로젝트 리스트에 프로젝트 추가
  async function handleSubmit(e) {
    e.preventDefault();

    if (certificateInfo.title === '') {
      alert('제목을 입력하세요.');
      return;
    }
    else if (certificateInfo.description === '') {
      alert('상세내역을 입력하세요');
      return;
    }

    const data = { user_id: userState.user.id, title:certificateInfo.title, description: certificateInfo.description, 
      when_date: certificateInfo.when_date.getFullYear()+'-'+(certificateInfo.when_date.getMonth()+1)+'-'+certificateInfo.when_date.getDate(), 
    }
    const res = await Api.post('certificate/create', data);

    setCertificateList(current => {
      const newCertificate = [...current];
      newCertificate.push(res.data);
      return newCertificate;
    });
    setIsEditing(false);
  }

  return (
    <Form style={{ margin: 10, padding: 10, }} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          value={certificateInfo.title}
          placeholder="자격증"
          autoComplete="off"
          onChange={(e) => (handleOnChange(e.target.value, 'title'))}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="text"
          value={certificateInfo.description}
          placeholder="상세내역"
          autoComplete="off"
          onChange={(e) => (handleOnChange(e.target.value, 'description'))} />
      </Form.Group>

      <Form.Group className="mt-3 row">
        <div className="col-auto">
          <DatePicker selected={certificateInfo.when_date} onChange={date => (handleOnChange(date, 'when_date'))}></DatePicker>
        </div>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button size= "sm" variant="primary" type="submit" className="me-3 btn btn-primary">
            확인
          </Button>
          <Button size= "sm" variant="secondary" type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>  
      </Form.Group>
    </Form>
  );
}

export default CertificateForm;