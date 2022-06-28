import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";

// 편집 버튼 클릭 시 나타나는 수정용 form
const CareerEdit = ({ item, onUpdate, editHandler }) => {
  const { 
    user_id, 
    id, 
    company, 
    job_position, 
    achievement, 
    from_date, 
    to_date, 
    isCurrent 
  } = item;

  const [radioCheck, setRadioCheck] = useState(isCurrent)
  const [careerInfo, setCareerInfo] = useState({
    company,
    job_position,
    achievement,
    from_date:new Date(from_date),
    to_date:new Date(to_date),
    isCurrent,
  })

  const handleOnChange = (data, name) => {
    setCareerInfo(current => ({
      ...current,
      [name] : data
    }))
  }
  // 폼 제출 시 값 update 함수
  const submitHandler = (e) => {
    e.preventDefault();

    let c = careerInfo.company;
    let j = careerInfo.job_position;
    let a = careerInfo.achievement;
    let f = careerInfo.from_date;
    let t = careerInfo.to_date;
    let newFromDate = f.getFullYear()+'-'+(f.getMonth()+1)+'-'+f.getDate();
    let newToDate = t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate();
    
    if (radioCheck) {
      editHandler(user_id, id, c, j, a, newFromDate, '재직중', radioCheck)
      onUpdate();
      return;
    }

    // 폼 입력 값이 모두 존재할 때, Career 컴포넌트에서 받아온 PUT 요청 함수와 CareerCard에서 받아온 수정 form hide 처리용 함수를 실행
    if (c && j && a && newFromDate && newToDate) {
      if (!(f <= t)) {
        alert('옳지않은 기간입니다. 다시 입력하세요.');
        return;
      }
      else {
        editHandler(user_id, id, c, j, a, newFromDate, newToDate, radioCheck)
        onUpdate();
      }
  }};

  return (
    <Form style={{ margin: 10, padding: 10, }} onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name='company'
          value={careerInfo.company}
          onChange={(e) => handleOnChange(e.target.value, 'company')}
          placeholder='회사 이름'
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type='text'
          name='job_position'
          value={careerInfo.job_position}
          onChange={(e) => handleOnChange(e.target.value, 'job_position')}
          placeholder='회사 직위 (직책, 근무 부서 등)'
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type='text'
          name='achievement'
          value={careerInfo.achievement}
          onChange={(e) => handleOnChange(e.target.value, 'achievement')}
          placeholder='담당 업무'
        />
      </Form.Group>
      

      <Form.Group className="mt-3 row">
        <div className="col-auto">
          <DatePicker 
            selected={careerInfo.from_date} 
            onChange={date => (handleOnChange(date, 'from_date'))}
          ></DatePicker>
        </div> 
        <div className="col-auto">
          <DatePicker 
            disabled={radioCheck} 
            selected={radioCheck ? null : careerInfo.to_date} 
            onChange={date => (handleOnChange(date, 'to_date'))}
          ></DatePicker>
        </div>
        <Col style={{margin:"auto",}}>
          <Form.Check 
            type="switch"
            id="custom-switch"
            label="재직중"
            onChange={(e) => {
              setRadioCheck(!radioCheck)
              setCareerInfo(cur => {
                const newObj = {...cur}
                newObj.isCurrent = !radioCheck;
                newObj.to_date = new Date();
                return newObj
              })
            }}
            checked={radioCheck}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button size='sm' variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button size='sm' variant="secondary" onClick={onUpdate}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  )
};

export default CareerEdit;