// 각 Award 컴포넌트는 isEditing 상태에 따라, false면 AwardCard, true면 AwardEditForm이 됩니다.

import React, {useState} from "react";
import AwardEditForm from "./AwardEditForm";
import AwardCard from "./AwardCard";

const Award = ({ awards, portfolioOwnerId, award, isEditable, setAwards}) => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);

// isEditing이 true이면 AwardEditForm을 생성하고, false이면 AwardCard를 생성함.
  return (
    <>
        {isEditing ? (
            <AwardEditForm
              awards={awards}
              award={award}
              setIsEditing={setIsEditing}
              setAwards={setAwards}
              portfolioOwnerId={portfolioOwnerId}
            />
        ) : (
            <AwardCard
              awards={awards}
              award={award}
              setIsEditing={setIsEditing}
              isEditable={isEditable}
              setAwards={setAwards}
              portfolioOwnerId={portfolioOwnerId}
            />
        )}
    </>
  );
}

export default Award;
