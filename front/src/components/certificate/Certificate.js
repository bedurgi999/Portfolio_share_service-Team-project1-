import React from "react";
import CertificateCard from './CertificateCard';

// 자격증 카테고리의 전체적인 구조
const Certificate = ({portfolioOwnerId, isEditable}) => {
    return (
        <>
            <CertificateCard portfolioOwnerId={portfolioOwnerId} isEditable={isEditable}></CertificateCard>
        </>
    )
}

export default Certificate;