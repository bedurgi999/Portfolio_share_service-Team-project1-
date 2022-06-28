import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const AwardAddForm = ({ portfolioOwnerId, awards, setAwards, setIsAdding}) => {
  // 입력받을 award의 title과 description을 담을 state를 지정함.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // submit(확인) 버튼을 클릭하면 실행하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // awardlist로 title과 description의 정보를 담아 POST 요청함.
    const res = await Api.post("award/create", {
      user_id: portfolioOwnerId,
      title,
      description,
    });

    // POST된 데이터를 awards에 담아줌.
    setAwards(() => {
        let newAwards = [...awards];
        newAwards.push(res.data);
        return newAwards;
    })
    
    // isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  // bootstrap Form을 이용하여 award의 title과 description을 입력받아 세팅함.
  // 확인 버튼은 submit, 취소 버튼은 setIsAdding을 false로 변경하여 추가를 끝냄.
  return (
    <Form
      style={{margin:10, padding: 10,}}
      onSubmit={handleSubmit}
    >
      <Form.Group
        controlId="useEditTitle"
        className="mb-3"
      >
        <Form.Control
            type="text"
            value={title}
            placeholder="수상내역"
            onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="userEditDescription">
        <Form.Control
            type="text"
            value={description}
            placeholder="상세내역"
            onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group
        as={Row}
        className="mt-3 text-center"
      >
        <Col sm={{ span: 20 }}>
            <Button
              size="sm"
              variant="primary"
              type="submit"
              className="me-3"
            >
              확인
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsAdding(false)}
            >
              취소
            </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardAddForm;
