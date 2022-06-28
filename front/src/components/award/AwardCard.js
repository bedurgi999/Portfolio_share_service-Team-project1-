import { Row, Button, Col, Container, Card, ButtonGroup, Modal } from "react-bootstrap";
import * as Api from "../../api";
import {useState} from "react"

// Award 컴포넌트에서 award를 입력받아서 award의 title과 description을 나타냄.
// isEditable이 true일 경우, 편집 버튼을 생성함.
const AwardCard = ({ awards, award, setIsEditing, isEditable, setAwards }) => {

  const [show, setShow] = useState(false)

  // award를 delete하는 함수
  const handleDelete = () => {
      // DELETE 요청
      Api.delete(`awards/${award.id}`);

      // awards에서 delete된 데이터를 제거
      const newAwards = awards.filter((v) => v.id !== award.id);
      setAwards(newAwards);

      setShow(false)
  }

  // award 상세 목록 및 편집, 삭제 버튼 생성
  // 삭제 버튼 클릭하면 Modal 나타나서 삭제 재확인하고 handleDelete 실행함.
  return (
    <Container style={{padding: 10, margin:"10px 0", borderBottom: "rgba(70, 65, 65, 0.2) dotted"}}>
      <Row>
        <Col sm={10}>
          <Card.Subtitle>{award?.title}</Card.Subtitle>
          <Card.Text className="text-muted">{award?.description}</Card.Text>
        </Col>
        <Col sm={2}>
          <ButtonGroup
            style={{ margin: 10, }}
            size='sm'
          >
            {isEditable && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <span
                    className="material-icons"
                    style={{verticalAlign:"middle",fontSize:20,}}
                  >
                    edit
                  </span>
                </Button>
            )}
            {isEditable && (
                <>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setShow(true)}
                  >
                    <span
                      className="material-icons"
                      style={{verticalAlign:"middle",fontSize:20,}}
                    >
                      delete
                    </span>
                  </Button>
                  <Modal
                    show={show}
                    style={{zIndex:99999,}}
                  >
                  <Modal.Header>
                  <Modal.Title>해당 내용을 삭제하시겠습니까?</Modal.Title>
                  </Modal.Header>
                  <br />
                  <Modal.Footer style={{justifyContent:"center"}}>
                  <Button
                    variant="danger"
                    onClick={handleDelete}
                  >
                      삭제
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={()=>setShow(false)}
                  >
                        취소
                    </Button>
                  </Modal.Footer>
                  </Modal>
                </>
            )}
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default AwardCard;
