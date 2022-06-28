import React, { useState } from "react";
import { Card, Button, ButtonGroup, Container, Row, Col, Modal } from "react-bootstrap";
import * as Api from '../../api';

import CertificateEdit from './CertificateEdit';

// 자격증 카드를 구성하는 구조
function CertificateElement({ certificate, isEditable, setCertificateList }) {
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false)

    const handleDelete = (e) => {
        e.preventDefault();
        Api.delete('certificates', certificate.id);
        let del_idx = 0;
        setCertificateList(current => {
            for (let i = 0; i < current.length; i++) {
                if (current[i].id === certificate.id) {
                    del_idx = i;
                    break;
                }
            }
            current.splice(del_idx, 1);
            const newCertificate = [...current];
            return newCertificate;
        })
        setShow(false)
    }



    return (
        edit ? <CertificateEdit title={certificate.title} 
                            description={certificate.description} 
                            when_date={certificate.when_date} 
                            setEdit={setEdit}
                            id={certificate.id}
                            setCertificateList={setCertificateList}></CertificateEdit> : 
            <Container style={{padding: 10, margin:"10px 0", borderBottom: "rgba(70, 65, 65, 0.2) dotted"}}>
                <Row>
                    <Col sm={10} style={{margin:"auto"}}>
                        <Card.Subtitle>{certificate.title}</Card.Subtitle>
                        <Card.Text className="text-muted">{certificate.description} <br /> {certificate.when_date}</Card.Text>
                    </Col>
                    <Col sm={2} style={{margin:"auto"}}>
                    {isEditable && (
                        <>
                            <ButtonGroup style={{margin: 10,}} size='sm'>
                                <Button variant="secondary" size="sm" onClick={() => setEdit(true)}>
                                    <span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>edit</span>
                                </Button>
                                <Button variant="danger" size="sm" onClick={()=> setShow(true)}>
                                    <span className="material-icons" style={{verticalAlign:"middle",fontSize:20,}}>delete</span>
                                </Button>
                            </ButtonGroup>
                            <Modal show={show} style={{zIndex:99999,}}>
                            <Modal.Header>
                            <Modal.Title>해당 내용을 삭제하시겠습니까?</Modal.Title>
                            </Modal.Header>
                            <br />
                            <Modal.Footer style={{justifyContent:"center"}}>
                            <Button variant="danger" onClick={handleDelete}>
                                삭제
                            </Button>
                            <Button variant="secondary" onClick={()=>setShow(false)}>
                                    취소
                                </Button>
                            </Modal.Footer>
                            </Modal>
                        </>
                        )}
                    </Col>
                </Row>
            </Container>
        )
}

export default CertificateElement;