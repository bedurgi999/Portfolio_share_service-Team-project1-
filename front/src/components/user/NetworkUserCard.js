import { useNavigate } from "react-router-dom";
import { Card, Row, Badge } from "react-bootstrap";
import "./NetworkUserCard.css"

function NetworkUserCard({ user }) {
  const navigate = useNavigate();
  const defaultImage = "https://team3.cdn.ntruss.com/default.png";

  const colorChange = () => {
    if (user?.job === "프론트엔드") {
      return "info";
    } else if (user?.job === "백엔드") {
      return "dark";
    } else if (user?.job === "데이터 분석") {
      return "success";
    } else if (user?.job === "AI") {
      return "warning";
    } else if (user?.job === "기타") {
      return "secondary";
    } else {
      return null;
    }
  };

  return (
    <Card
      id="card"
      onClick={() => navigate(`/users/${user.id}`)}
      className="mb-2 ms-3 mr-5"
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "9rem", height: "9rem", borderRadius: 100, margin:0, padding:0, }}
            className="mb-3"
            src={user?.profile ?? defaultImage}
            alt="사용자 프로필"
          />
        </Row>
        <Card.Title
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {user?.name}
        </Card.Title>

        <Card.Subtitle className="mb-2 text-muted" style={{textAlign:"center"}}>{user?.email}</Card.Subtitle>
        <Card.Text style={{borderTop:"grey solid 1px", padding:5,}}>{user?.description}</Card.Text>
      </Card.Body>
      <Card.Text style={{display:"flex", flexDirection:"row", alignItems:"center",justifyContent:"space-between",padding:16,}}>
          <h6 style={{ margin: "auto 5px" }}>
            <Badge pill bg={colorChange()}>
              {" "}
              {user?.job}
            </Badge>
          </h6>
          <div><i className="fa-regular fa-file-lines"></i> {user?.projectNum}</div>
        </Card.Text>
    </Card>
  );
}

export default NetworkUserCard;
