import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";

import * as Api from "../../api";
import "./RegisterForm.css"

function RegisterForm() {
  const navigate = useNavigate();

  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState("");
  //useState로 password 상태를 생성함.
  const [password, setPassword] = useState("");
  //useState로 confirmPassword 상태를 생성함.
  const [confirmPassword, setConfirmPassword] = useState("");
  //useState로 name 상태를 생성함.
  const [name, setName] = useState("");
  //useState로 job 상태를 생성함.
  const [job, setJob] = useState("");

  //useState로 modal창의 상태를 생성함(회원가입 성공했을 시)
  const [successShow, setSuccessShow] = useState(false);
  //useState로 modal창의 상태를 생성함(회원가입 실패했을 시)
  const [failShow, setFailShow] = useState(false);

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;
  //관심직무가 선택되었는지 확인
  const isJobValid = job.length > 0;
  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    isPasswordSame &&
    isNameValid &&
    isJobValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청함.
      await Api.post("user/register", {
        email,
        password,
        name,
        job,
      });

      setSuccessShow(true);
    } catch (err) {
      setFailShow(true);
      console.log("회원가입에 실패하였습니다.", err);
    }
  };

  const successHandleClose = (e) => {
    e.preventDefault();
    setSuccessShow(false);
    navigate("/login");
  };

  const failHandleClose = (e) => {
    e.preventDefault();
    setFailShow(false);
  };

  return (
    <div id="register-container">
      <Container>
        <Row>
          <Col lg={8}>
            <Form style={{padding:30, marginTop: "50px", backgroundColor:"rgba(255, 255, 255, 0.6)",borderRadius:20,}} onSubmit={handleSubmit}>
              <Form.Group controlId="registerEmail">
                <Form.Label>이메일 주소</Form.Label>
                <Form.Control
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!isEmailValid && (
                  <Form.Text className="text-success">
                    이메일 형식이 올바르지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerPassword" className="mt-3">
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isPasswordValid && (
                  <Form.Text className="text-success">
                    비밀번호는 4글자 이상으로 설정해 주세요.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerConfirmPassword" className="mt-3">
                <Form.Label>비밀번호 재확인</Form.Label>
                <Form.Control
                  type="password"
                  autoComplete="off"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {!isPasswordSame && (
                  <Form.Text className="text-success">
                    비밀번호가 일치하지 않습니다.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerName" className="mt-3">
                <Form.Label>이름</Form.Label>
                <Form.Control
                  type="text"
                  autoComplete="off"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isNameValid && (
                  <Form.Text className="text-success">
                    이름은 2글자 이상으로 설정해 주세요.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="registerJob" className="mt-3">
                <Form.Label>관심 직무</Form.Label>
                <Form.Select value={job} onChange={(e) => setJob(e.target.value)}>
                  <option value="">관심 직무를 선택해주세요.</option>
                  <option value="프론트엔드">프론트엔드</option>
                  <option value="백엔드">백엔드</option>
                  <option value="데이터 분석">데이터 분석</option>
                  <option value="AI">AI</option>
                  <option value="기타">기타</option>
                </Form.Select>
                {!isJobValid && (
                  <Form.Text className="text-success">
                    관심 직무를 선택해주세요.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button variant="primary" type="submit" disabled={!isFormValid}>
                    회원가입
                  </Button>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mt-3 text-center">
                <Col sm={{ span: 20 }}>
                  <Button style={{backgroundColor:"rgba(255, 255, 255, 0)",border:"none",color:"black"}} onClick={() => navigate("/login")}>
                    로그인하기
                  </Button>
                </Col>
              </Form.Group>
            </Form>
            <Modal show={successShow}>
              <Modal.Header>
                <Modal.Title>회원가입을 축하합니다🎉</Modal.Title>
              </Modal.Header>
              <Modal.Body>로그인 페이지로 이동합니다.</Modal.Body>
              <Modal.Footer>
                <Button onClick={successHandleClose}>
                  확인
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={failShow}>
              <Modal.Header>
                <Modal.Title>회원가입에 실패하였습니다.</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                해당 이메일 주소로 가입된 유저가 있습니다.
                <br />
                새로운 이메일 주소를 생성해주세요.
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={failHandleClose}>
                  확인
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterForm;
