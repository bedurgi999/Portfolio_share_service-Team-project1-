import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Nav, Form, Button, Modal } from "react-bootstrap";
import "./Projects.css"
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import SearchedProjectCard from "./SearchedProjectCard";

function Projects() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [isAll, setIsAll] = useState(true);
  const [isShearched, setIsSearched] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const handleClose = () => setIsShow(false);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("projectslist").then((res) => setProjects(res.data));
  }, [userState, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) {
      setIsShow(true);
    } else {
      setIsAll(false);
      setFilteredProjects(
        projects.filter(
          (project) =>
            project.title.toLowerCase().indexOf(query) !== -1 ||
            project.description.toLowerCase().indexOf(query) !== -1
        )
      );
      setIsSearched(true);
    }
  };

  const handleQuery = (e) => {
    setQuery(e.target.value.trim().toLowerCase());
  };

  return (
    <Container fluid style={{ padding: 0 }}>
      <div style={{ height: 110 }}></div>
      <div id="projects-banner">
        <h2 style={{fontWeight:"bolder",}}>Projects</h2>
        <h4>관심 있는 프로젝트를 한 눈에</h4>
      </div>
      <Nav 
        className="me-auto" 
        style={{padding:"40px 0 20px 0", justifyContent:"center",}}
      >
        <Nav.Item>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Group style={{marginRight:"10px",width:500,}}>
              <Form.Control
                type="search"
                placeholder="프로젝트 검색"
                className="me-2"
                aria-label="Search"
                onChange={handleQuery}
              />
              {!query && (
                <Form.Text className="text-success">
                  관심 있는 프로젝트를 검색합니다.
                </Form.Text>
              )}
            </Form.Group>
            <Button
              style={{
                backgroundColor: "white",
                border: "none",
                padding: "5px 0 0 0",
                height: 32,
              }}
              onClick={handleSearch}
            >
              <span
                className="material-icons"
                style={{ color: "grey", fontSize: 32 }}
              >
                search
              </span>
            </Button>
          </Form>
        </Nav.Item>
        {isShearched ? (
          <>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
                총 <span style={{color:"#0d62fd"}}>{filteredProjects.length}</span>개가 검색되었습니다.
              </Nav.Link>
            </Nav.Item>
          </>
        ) : (
          <>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled></Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
      {isAll ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Row xs="auto" style={{ width: 1217, justifyContent: "flex-start" }}>
            {projects.map((project) => (
              <SearchedProjectCard
                key={project.id}
                project={project}
                isNetwork
              />
            ))}
          </Row>
        </div>
      ) : (
        <></>
      )}
      {isShearched ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Row xs="auto" style={{ width: 1217, justifyContent: "flex-start" }}>
            {filteredProjects.map((project) => (
              <SearchedProjectCard
                key={project.id}
                project={project}
                isNetwork
              />
            ))}
          </Row>
        </div>
      ) : (
        <></>
      )}
      <Modal show={isShow} style={{ zIndex: 99999 }}>
        <Modal.Body>검색어를 입력하세요.</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Projects;
