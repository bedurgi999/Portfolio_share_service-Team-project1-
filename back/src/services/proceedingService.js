import { Proceeding } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class proceedingAuthService {
  // 진행중인 프로젝트 추가
  static async addProceeding({ user_id, title, start_date, end_date }) {
      const user = await Proceeding.findUserById({ user_id });
      if (user.length === 0) {
          const errorMessage = "해당 유저가 존재하지 않습니다.";
          return { errorMessage };
      }

      const proceeding_id = uuidv4();
      
      const newProceeding = {
          id: proceeding_id,
          user_id,
          title,
          start_date,
          end_date,
      };
      const createdNewProceeding = await Proceeding.create({ newProceeding });
      createdNewProceeding.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
      
      return createdNewProceeding;
  }

  // 유저의 진행중인 프로젝트 조회
  static async getProceedings({ user_id }) {
      const proceedings = await Proceeding.findByUserId({ user_id });
      return proceedings;
  }

  // 진행중인 프로젝트 수정
  static async setProceeding({ proceeding_id, toUpdate }) {
    let proceeding = await Proceeding.findByProceedingId({ proceeding_id });

    if (!proceeding) {
      const errorMessage =
        "프로젝트가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 수정해야하는 필드에 맞는 값을 업데이트
    const toUpdateField = Object.keys(toUpdate);

    toUpdateField.forEach(key => {
      if (!toUpdate[key]) delete toUpdate[key];
    });
    
    proceeding = await Proceeding.update({ proceeding_id, toUpdate });

    return proceeding;
  }

  // 진행중인 프로젝트 삭제
  static async deleteProceeding({ proceeding_id }) {
    const deletedProceeding = await Proceeding.deleteProceeding({
      proceeding_id,
    });

    if (!deletedProceeding) {
      const errorMessage =
        "프로젝트 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return deletedProceeding;
  }

  // 유저의 진행중인 프로젝트 모두 삭제
  static async deleteAllProceeding({ user_id }) {
    const deletedProceedings = await Proceeding.deleteAll({ user_id });
    
    return;
  }
}

export { proceedingAuthService };
