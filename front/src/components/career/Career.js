import { useState, useEffect } from 'react';
import CareerCardList from './CareerCardList';
import CareerAddForm from './CareerAddForm';
import { Button, Card } from "react-bootstrap";
import * as Api from '../../api';

// 경력 최상위 컴포넌트
// CareerCardList 컴포넌트 + "+" 버튼 + CareerAddForm 컴포넌트("+" 버튼 클릭 시 생김)
const Career = ({ portfolioOwnerId, isEditable }) => {
  
  // user_id 값
  const userId = portfolioOwnerId;
  const [topics, setTopics] = useState([]);
  const [visible, setVisible] = useState(false);

  // GET 요청
  useEffect(() => {
    Api
      .get("careerlist", userId)
      .then(res => {
        setTopics(res.data)
        console.log(res.data)});
  }, [userId]);

  // 추가 가능 구현 함수 (EducationCardList에 추가할 값 post로 요청)
  const createHandler = (company, job_position, achievement, from_date, to_date, isCurrent) => {
    const newTopic = { user_id: userId, company, job_position, achievement, from_date, to_date, isCurrent};
    let copied = [...topics];
    Api
      .post('career/create', newTopic)
      .then(res => {
        copied.push(res.data)
        setTopics(copied)
      });
  };

  // "+"" 버튼 show 및 hide 처리 함수
  const clickHandler = () => {
    setVisible(!visible);
  };

  // 수정 기능 구현 함수
  const editHandler = (user_id, id, company, job_position, achievement, from_date, to_date, isCurrent) => {
    const editTopic = { 
      user_id, 
      id, 
      company, 
      job_position, 
      achievement, 
      from_date, 
      to_date, 
      isCurrent 
    };
    
    Api
      .put(`careers/${id}`, editTopic)
      .then(res => console.log(res.data));

    const mapped = topics.map((v) => {
      if (v.id === id) {
        return { 
          ...v, 
          company, 
          job_position, 
          achievement, 
          from_date, 
          to_date, 
          isCurrent 
        }
      }
      else {
        return { ...v }
      }
    });
    setTopics(mapped);
  };

  // 삭제 기능 구현 함수
  const deleteHandler = (id, value) => {
    Api
      .delete(`careers/${id}`, value)
      .then(res => console.log(res.data));

    const filtered = topics.filter((v) => v.id !== id);
    setTopics(filtered);
  };

  // 로그인 유저는 자신의 페이지만 추가/편집/삭제 가능
  // "+" 버튼 클릭 시 버튼 숨김 처리 및 추가폼 show  
  return (
    <Card style={{width:"740px"}}>
      <Card.Body>
        <Card.Title><span className="material-icons" style={{verticalAlign:"middle",}}>work</span> 경력</Card.Title>
        <CareerCardList 
          topics={topics} 
          editHandler={editHandler} 
          deleteHandler={deleteHandler} 
          isEditable={isEditable} 
        />
        {visible ? 
          <CareerAddForm
            topics={topics} 
            onCreate={createHandler} 
            clickHandler={clickHandler} 
          /> :
          <div style={{ textAlign: 'center', padding:"16px" }}>
            {isEditable ? 
            <Button style={{borderRadius:100,}} size='sm' onClick={clickHandler}>
              <span className="material-icons" style={{verticalAlign:'middle',fontSize:15,}}>add</span>
            </Button> : <></>}
          </div>}
      </Card.Body>
    </Card>
  );
};

export default Career;