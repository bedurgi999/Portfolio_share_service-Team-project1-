import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Form, Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";

import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({});

  const portfolioOwnerId = params.userId;

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);


  const withdrawal = async () => {
    // 회원탈퇴 확인창
    alert(`${user.name}님, 회원탈퇴가 완료되었습니다.`);

    // 해당 유저의 학력, 수상이력, 프로젝트, 자격증 삭제
    await Api.delete(`educationlist/${user.id}`);
    await Api.delete(`awardlist/${user.id}`);
    await Api.delete(`projectlist/${user.id}`);
    await Api.delete(`certificatelist/${user.id}`);

    // 해당 유저 DELETE 요청 처리
    await Api.delete(`users/${user.id}`);
    // 로그인 페이지로 돌아감
    navigate("/login");
  };

  return (
    <div className="profilePage">
      <div className="profileCard">
        <Card
          className="mb-2 ms-3 mr-5" 
          style={{ width: "18rem" }}
        >
          <Card.Body>
            <Row className="justify-content-md-center">
              <Card.Img
                style={{ width: "10rem", height: "8rem" }}
                className="mb-3"
                src="http://placekitten.com/200/200"
                alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
              />
            </Row>
            <Card.Title>{user?.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
            <Card.Text>{user?.description}</Card.Text>

            <Col>
              <Row className="mt-3 text-center text-info">
                  <Col sm={{ span: 20 }}>
                  <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={withdrawal}
                  >
                      회원탈퇴
                  </Button>
                  </Col>
              </Row>
            </Col>
          </Card.Body>
        </Card>
      </div>
      <div className="EditProfile">
        <h4>프로필 카드 설정</h4>
        <UserEditForm user={user} setUser={setUser} />
      </div>
    </div>
  );
}

function UserEditForm({ user, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState('');
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState('');
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    alert("프로필 정보가 수정되었습니다.");
  };

  return (
    <Card className="mb-2" border="light">
      <Card.Body>
        <p>이름</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder={user.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <p>이메일</p>
          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <p>설명</p>
          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder={user.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                설정 저장
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProfilePage;
