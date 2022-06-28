import { useNavigate } from "react-router-dom";
import { Card, Row, Badge } from "react-bootstrap";
import "./SearchedProjectCard.css";
function SearchedProjectCard({ project, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  const colorChange = () => {
    if (project?.user.job === "프론트엔드") {
      return "info";
    } else if (project?.user.job === "백엔드") {
      return "dark";
    } else if (project?.user.job === "데이터 분석") {
      return "success";
    } else if (project?.user.job === "AI") {
      return "warning";
    } else if (project?.user.job === "기타") {
      return "secondary";
    } else {
      return null;
    }
  };


  return (
    <Card
      id="card"
      onClick={() => navigate(`/users/${project.user_id}`)}
      className="mb-2 ms-3 mr-5"
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <Card.Body>
        <Row className="justify-content-md-center"></Row>
        <Card.Title
          style={{
            height: "40%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {project?.title}
        </Card.Title>
        <Card.Text
          className="project-description"
          style={{ borderTop: "grey solid 1px", padding: 5 }}
        >
          {project?.description}
        </Card.Text>
      </Card.Body>
      <Card.Text style={{margin: "20px 0 0 20px"}}><div><i className="fa-solid fa-heart" style={{ color:  "#faa6a0" }}/>
            &nbsp; {project.likes}</div></Card.Text>
      <Card.Text
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px 16px 16px",
        }}
      >
        
        <h6 style={{ margin: "0px 5px" }}>
          <Badge pill bg={colorChange()}>
            {" "}
            {project?.user.job}
          </Badge>
        </h6>
        
        <div style={{ fontWeight: "bold" }}>@{project?.user.name}</div>
      </Card.Text>
    </Card>
  );
}

export default SearchedProjectCard;
