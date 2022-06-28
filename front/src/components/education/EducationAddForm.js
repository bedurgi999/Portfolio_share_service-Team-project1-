import { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import './EducationAddForm.css';
// + 버튼 클릭 시 나타나는 create 폼 컴포넌트
const EducationForm = ({ onCreate, clickHandler }) => {
  // const [schoolInput, setSchoolInput] = useState('');
  const [majorInput, setMajorInput] = useState('');
  const [univ, setUniv] = useState([]);
  // const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    const univData = require('./univ.json');
    setUniv(univData.dataSearch.content.map((u) => u.schoolName));

  }, [])

  // major value 값 변경 함수
  const changeHandler2 = (e) => {
    e.preventDefault();
    setMajorInput(e.target.value);
  }

  // 추가 기능 함수
  const submitHandler = (e) => {
    e.preventDefault();

    let s = e.target.school.value;
    let m = e.target.major.value;
    let p = e.target.group.value;

    // 입력값이 모두 존재할 때, create 폼 제출 및 값 POST 요청, 폼 내부 초기화, "+" 버튼 show 처리
    if (s && m && p) {
      onCreate(s, m, p);
      clickHandler();
      // setSchoolInput('');
      setMajorInput('');
    };
  };
  return (
    <Form style={{ margin: 10, padding: 10, }} onSubmit={submitHandler}>
      <div>
        <input 
          className="form-control" 
          type="text" list="datalistOptions"  
          placeholder="학교 이름" 
          name='school' 
          style={{marginBottom:10}}
        ></input>
        <datalist id="datalistOptions">
          {univ.length > 0 && (
            univ.map((u, idx) => <option key={idx} value={u} ></option>)
          )}
        </datalist>
      </div>

      <Form.Group className="mb-3">
        <Form.Control
          type='text'
          name='major'
          value={majorInput}
          onChange={changeHandler2}
          placeholder='전공'
        />
      </Form.Group>

      <div key={"inline-radio"} className="mb-3">
        <Form.Check
          inline
          label="재학중"
          value="재학중"
          name="group"
          type="radio"
          id="inline-radio-1"
        />
        <Form.Check
          inline
          label="학사졸업"
          value="학사졸업"
          name="group"
          type="radio"
          id="inline-radio-2"
        />
        <Form.Check
          inline
          label="석사졸업"
          value="석사졸업"
          name="group"
          type="radio"
          id="inline-radio-3"
        />
        <Form.Check
          inline
          label="박사졸업"
          value="박사졸업"
          name="group"
          type="radio"
          id="inline-radio-4"
        />
      </div>

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

export default EducationForm;