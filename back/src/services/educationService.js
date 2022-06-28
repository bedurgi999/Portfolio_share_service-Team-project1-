import { User, Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
  // 학력 사항 추가
  static async addEducation({ user_id, school, major, position }) {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newEducation = { id, user_id, school, major, position };
    
    // 해당 유저가 존재하는지 확인
    const user = await User.findById({ user_id });
    if (!user) {
      const errorMessage = "해당 유저가 존재하지 않습니다.";
      return { errorMessage };
    }

    // db에 저장
    const createdNewEducation = await Education.create({ newEducation });
     // 문제 없이 db 저장 완료되었으므로 에러가 없음
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }

  // 해당 학력 사항의 상세 정보 불러오기
  static async getEducationInfo({ education_id }) {
    const education = await Education.findById({ education_id });

    if (!education) {
      const message = "해당 사항이 이미 삭제되었거나 존재하지 않습니다.";
      return { message };
    }
    return education;
  }

  // 해당 유저의 학력 사항 불러오기
  static async getEducations({ user_id }) {
    const education = await Education.findByUserId({ user_id });
    return education;
  }

  // 학력 사항 수정
  static async setEducation({ education_id, toUpdate }) {
    let education = await Education.findById({ education_id })

    if (!education) {
      const errorMessage = "해당 학력 정보가 존재하지 않습니다. 다시 시도해주세요.";
      return { errorMessage };
    }
    
    // 수정해야하는 필드에 맞는 값을 업데이트
    const toUpdateField = Object.keys(toUpdate);

    toUpdateField.forEach(key => {
      if (!toUpdate[key]) delete toUpdate[key];
    });
    
    education = await Education.update({ education_id, toUpdate });
    return education;
  }
  
  // 학력 사항 삭제
  static async deleteEducation({ education_id }) {
    const deletedEducation = await Education.delete({ education_id });
    
    // 삭제가 정상적으로 된 경우
    if (deletedEducation.deletedCount === 1) return;

    // 삭제가 제대로 되지 않았을 경우
    const message = "삭제가 정상적으로 이루어지지 않았습니다.";
    return { message };
  }

  // 유저의 학력 사항 모두 삭제
  static async deleteAllEducation({ user_id }) {
    const deletedEducations = await Education.deleteAll({ user_id });
    
    return;
  }
}

export { educationService };
