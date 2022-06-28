import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import * as Api from '../../api';
import CertificateList from './CertificateList';
import CertificateForm from './CertificateForm';

// 자격증 Card 구성
const CertificateCard = ({ portfolioOwnerId, isEditable }) => {

    const [certificateList, setCertificateList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        Api.get('certificatelist', portfolioOwnerId)
            .then(res => setCertificateList(res.data));
    }, [portfolioOwnerId]);

    return (<Card style={{width:"740px"}}>
        <Card.Body>
            <Card.Title><span className="material-icons" style={{verticalAlign:"middle",}}>badge</span> 자격증</Card.Title>
            <CertificateList certificateList={certificateList} setCertificateList={setCertificateList} isEditable={isEditable} portfolioOwnerId={portfolioOwnerId}></CertificateList>
            {isEditable && (
                <div style={{ textAlign: "center" }}>
                    {!isEditing && <Card.Body><Button style={{borderRadius:100,}} size='sm' variant="primary" onClick={() => setIsEditing(true)}>
                        <span className="material-icons" style={{verticalAlign:'middle',fontSize:15,}}>add</span>
                    </Button></Card.Body>}
                    {isEditing && <CertificateForm setIsEditing={setIsEditing} portfolioOwnerId={portfolioOwnerId} setCertificateList={setCertificateList}></CertificateForm>}
                </div>
            )}
        </Card.Body>
    </Card>)
}
export default CertificateCard;