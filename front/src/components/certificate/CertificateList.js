import React from "react";
import CertificateElement from './CertificateElement';

// 자격증 목록을 그려주는 컴포넌트
const CertificateList = ({ certificateList, setCertificateList, isEditable, portfolioOwnerId }) => {
    return (
        certificateList.map((certificate, index) => (
            <CertificateElement key={index} certificate={certificate} isEditable={isEditable} setCertificateList={setCertificateList}></CertificateElement>
        ))
    );
}


export default CertificateList;
