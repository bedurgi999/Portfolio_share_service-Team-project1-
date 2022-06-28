import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";

// + 버튼 클릭 시 나타나는 create 폼 컴포넌트
const CareerAddForm = ({ onCreate, clickHandler }) => {
  const [radioCheck, setRadioCheck] = useState(false)
  const [careerInfo, setCareerInfo] = useState({
    company:'',
    job_position:'',
    achievement:'',
    from_date:new Date(),
    to_date:new Date(),
    isCurrent:false,
  })

  const handleOnChange = (data, name) => {
    setCareerInfo(current => ({
      ...current,
      [name] : data
    }))
  }

  // 추가 기능 함수
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
      onCreate(c, j, a, newFromDate, "재직중", radioCheck)
      setCareerInfo({
        company: '',
        job_position: '',
        achievement: '',
        from_date: new Date(),
        to_date: new Date(),
        isCurrent: true,
      })
      clickHandler();
      return;
    }

    // 입력값이 모두 존재할 때, create 폼 제출 및 값 POST 요청, 폼 내부 초기화, "+" 버튼 show 처리
    if (c && j && a && newFromDate && newToDate) {
      if (!(f <= t)) {
        alert('옳지않은 기간입니다. 다시 입력하세요.');
        return;
      }
      else {
        onCreate(c, j, a, newFromDate, newToDate, radioCheck)
        clickHandler();
        setCareerInfo({
          company:'',
          job_position:'',
          achievement:'',
          from_date:new Date(),
          to_date:new Date(),
          isCurrent:true,
      })}
    }
  };

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
            onChange={(e) => setRadioCheck(!radioCheck)}
            checked={radioCheck}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button size='sm' variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button size='sm' variant="secondary" onClick={() => clickHandler()}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default CareerAddForm;