import CareerCard from "./CareerCard";

// 경력 정보 조회 list 컴포넌트
const CareerCardList = ({ topics, editHandler, deleteHandler, isEditable }) => {
  return (
    <>
      {topics
        .map((item) => 
          <CareerCard 
            key={item.id} 
            value={item} 
            editHandler={editHandler} 
            deleteHandler={deleteHandler} 
            isEditable={isEditable} 
          />)}
    </>
  );

};

export default CareerCardList;