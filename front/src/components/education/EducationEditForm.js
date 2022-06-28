import { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

// 편집 버튼 클릭 시 나타나는 수정용 form
const EducationEdit = ({ item, onUpdate, editHandler }) => {
  const { user_id, id, school, major, position } = item;
  const [schoolInput, setSchoolInput] = useState(school);
  const [majorInput, setMajorInput] = useState(major);
  const [checking, setChecking] = useState(position);
  const [univ, setUniv] = useState([]);

  useEffect(() => {
    const univData = require('./univ.json');
    setUniv(univData.dataSearch.content.map((u) => u.schoolName));

  }, [])
  // 라디오 버튼 check 상태 변경 함수
  const checkHandler = (e) => {
    e.preventDefault();
    setChecking(e.target.value);
  };



  // major value 값 수정 함수
  const changeHandler2 = (e) => {
    e.preventDefault();
    setMajorInput(e.target.value);
  };

  // 폼 제출 시 값 update 함수
  const submitHandler = (e) => {
    e.preventDefault();

    let s = e.target.school.value;
    let m = e.target.major.value;
    let p = e.target.group1.value;

    // 폼 입력 값이 모두 존재할 때, Education 컴포넌트에서 받아온 PUT 요청 함수와 EducationCard에서 받아온 수정 form hide 처리용 함수를 실행
    if (s && m && p) {
      editHandler(user_id, id, s, m, p);
      onUpdate();
    };

  };

  return (
    <Form style={{ margin: 10, padding: 10, }} onSubmit={submitHandler}>
      <input 
        className="form-control" 
        list="datalistOptions"  
        placeholder="학교 이름" 
        name='school' 
        style={{marginBottom:10}} 
        value={schoolInput} 
        onChange={(e) => {setSchoolInput(e.target.value)}}
      ></input>
      <datalist id="datalistOptions">
        {univ.length > 0 && (
          univ.map((u, idx) => <option key={idx} value={u}></option>)
        )}
      </datalist>

      <Form.Group className="mb-3">
        <Form.Control
          type='text'
          name='major'
          value={majorInput}
          onChange={changeHandler2}
          placeholder='전공명'
        />
      </Form.Group>

      <div key={id} className="mb-3">
        <Form.Check
          inline
          label="재학중"
          value="재학중"
          name="group1"
          type="radio"
          id="inline-radio-1"
          checked={checking === "재학중" ? true : false}
          onChange={checkHandler}
        />
        <Form.Check
          inline
          label="학사졸업"
          value="학사졸업"
          name="group1"
          type="radio"
          id="inline-radio-2"
          checked={checking === "학사졸업" ? true : false}
          onChange={checkHandler}
        />
        <Form.Check
          inline
          label="석사졸업"
          value="석사졸업"
          name="group1"
          type="radio"
          id="inline-radio-3"
          checked={checking === "석사졸업" ? true : false}
          onChange={checkHandler}

        />
        <Form.Check
          inline
          label="박사졸업"
          value="박사졸업"
          name="group1"
          type="radio"
          id="inline-radio-4"
          checked={checking === "박사졸업" ? true : false}
          onChange={checkHandler}
        />
      </div>

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

export default EducationEdit;