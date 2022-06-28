import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

import { UserStateContext } from "../App";
import * as Api from "../api";

import "./Portfolio.css";
import User from "./user/User";
import Awards from "./award/Awards";
import Project from "./project/Project";
import Certificate from "./certificate/Certificate";
import Education from "./education/Education";
import Proceeding from "./proceeding/Proceeding";
import Career from "./career/Career";

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();
  // useState 훅을 통해 portfolioOwner 상태를 생성함.
  const [portfolioOwner, setPortfolioOwner] = useState(null);
  // fetchPorfolioOwner 함수가 완료된 이후에만 (isFetchCompleted가 true여야) 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면, isFetchCompleted가 false이면 "loading..."만 반환되어서, 화면에 이 로딩 문구만 뜨게 됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const userState = useContext(UserStateContext);

  const [isEducation, setIsEducation] = useState(true);
  const [isAward, setIsAward] = useState(true);
  const [isProject, setIsProject] = useState(true);
  const [isCertificate, setIsCertificate] = useState(true);
  const [isProceeding, setIsProceeding] = useState(true);
  const [isCareer, setIsCareer] = useState(true);

  const fetchPorfolioOwner = async (ownerId) => {
    // 유저 id를 가지고 "/users/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
    const res = await Api.get("users", ownerId);
    // 사용자 정보는 response의 data임.
    const ownerData = res.data;
    // portfolioOwner을 해당 사용자 정보로 세팅함.
    setPortfolioOwner(ownerData);
    // fetchPorfolioOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    // 전역 상태의 user가 null이라면 로그인이 안 된 상태이므로, 로그인 페이지로 돌림.
    if (!userState.user) {
      // navigate("/login", { replace: true });
      navigate("/home", { replace: true });
      return;
    }

    if (params.userId) {
      // 만약 현재 URL이 "/users/:userId" 라면, 이 userId를 유저 id로 설정함.
      const ownerId = params.userId;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    } else {
      // 이외의 경우, 즉 URL이 "/" 라면, 전역 상태의 user.id를 유저 id로 설정함.
      const ownerId = userState.user.id;
      // 해당 유저 id로 fetchPorfolioOwner 함수를 실행함.
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return (
      <div
        className="loading"
        style={{
          fontWeight: "bold",
          fontSize: 40,
          textAlign: "center",
          height: "100vh",
          lineHeight: "100vh",
        }}
      >
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    );
  }

  return (
    <>
      <div style={{ height: 110 }}></div>
      <div id="banner_mypage">
        <h2 style={{ fontWeight: "bolder" }}>My page</h2>
        <h4>나만의 페이지를 작성해보세요</h4>
      </div>
      <div className="portfolioPage">
        <div className="portfolioCard">
          <User
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
            style={{ marginTop: "20px" }}
          />
        </div>
        <div className="portfolioContent">
          <Navbar>
            <Container style={{ padding: 0 }}>
              <Nav className="me-auto">
                <Nav.Link
                  className="navi"
                  href="#all"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsProceeding(true);
                    setIsEducation(true);
                    setIsCareer(true);
                    setIsAward(true);
                    setIsProject(true);
                    setIsCertificate(true);
                  }}
                >
                  <span
                    className="material-icons"
                    style={{ verticalAlign: "middle" }}
                  >
                    all_inbox
                  </span>{" "}
                  전체 보기
                </Nav.Link>
                <Nav.Link
                  className="navi"
                  href="#proceeding"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsProceeding(true);
                    setIsEducation(false);
                    setIsCareer(false);
                    setIsAward(false);
                    setIsProject(false);
                    setIsCertificate(false);
                  }}
                >
                  진행중인 프로젝트
                </Nav.Link>
                <Nav.Link
                  className="navi"
                  href="#education"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsProceeding(false);
                    setIsEducation(true);
                    setIsAward(false);
                    setIsProject(false);
                    setIsCertificate(false);
                    setIsCareer(false);
                  }}
                >
                  학력
                </Nav.Link>
                <Nav.Link
                  className="navi"
                  href="#career"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsProceeding(false);
                    setIsEducation(false);
                    setIsCareer(true);
                    setIsAward(false);
                    setIsProject(false);
                    setIsCertificate(false);
                  }}
                >
                  경력
                </Nav.Link>
                <Nav.Link
                  className="navi"
                  href="#award"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsProceeding(false);
                    setIsEducation(false);
                    setIsAward(true);
                    setIsProject(false);
                    setIsCertificate(false);
                    setIsCareer(false);
                  }}
                >
                  수상 내역
                </Nav.Link>
                <Nav.Link
                  className="navi"
                  href="#project"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsProceeding(false);
                    setIsEducation(false);
                    setIsAward(false);
                    setIsProject(true);
                    setIsCareer(false);
                    setIsCertificate(false);
                  }}
                >
                  프로젝트
                </Nav.Link>
                <Nav.Link
                  className="navi"
                  href="#certificate"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsProceeding(false);
                    setIsEducation(false);
                    setIsAward(false);
                    setIsProject(false);
                    setIsCareer(false);
                    setIsCertificate(true);
                  }}
                >
                  자격증
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          {!isEducation &&
          !isAward &&
          !isProject &&
          !isCertificate &&
          isProceeding ? (
            <>
              <Proceeding
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <br />
            </>
          ) : (
            <></>
          )}

          {isEducation ? (
            <>
              <Education
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <br />
            </>
          ) : (
            <></>
          )}

          {isCareer ? (
            <>
              <Career
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <br />
            </>
          ) : (
            <></>
          )}

          {isAward ? (
            <>
              <Awards
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <br />
            </>
          ) : (
            <></>
          )}

          {isProject ? (
            <>
              <Project
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <br />
            </>
          ) : (
            <></>
          )}

          {isCertificate ? (
            <>
              <Certificate
                portfolioOwnerId={portfolioOwner.id}
                isEditable={portfolioOwner.id === userState.user?.id}
              />
              <br />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Portfolio;
