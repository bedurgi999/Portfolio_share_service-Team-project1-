import { User, Award } from "../db";
import { v4 as uuidv4 } from "uuid";


class awardService {
  // 수상 내역 추가
  static async addAward({ user_id, title, description }) {
    // user_id가 유효하지 않은 경우
    const user = await User.findById({ user_id });
    if (!user) {
      return { errorMessage: "해당 유저가 존재하지 않습니다." };
    }

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newAward = { id, user_id, title, description };

    // db에 저장
    const createdNewAward = await Award.create({ newAward });
    // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    createdNewAward.errorMessage = null; 

    return createdNewAward;
  }

  // 수상 내역 상세 정보 조회
  static async getAwardInfo({ award_id }) {
    // db에 해당 수상 내역 존재 여부 확인
    const award = await Award.findById({ award_id });
    if (!award) {
      const errorMessage =
        "해당 수상 내역이 존재하지 않습니다.";
      return { errorMessage };
    }

    return award;
  }

  // user의 수상 내역 조회
  static async getAwards({ user_id }) {
    const awards = await Award.findByUserId({ user_id });
    return awards;
  }

  // 수상 내역 수정
  static async setAward({ award_id, toUpdate }) {
    let award = await Award.findById({ award_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "해당 수상 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 수정해야하는 필드에 맞는 값을 업데이트
    const toUpdateField = Object.keys(toUpdate);

    toUpdateField.forEach(key => {
      if (!toUpdate[key]) delete toUpdate[key];
    });

    award = await Award.update({ award_id, toUpdate });
    return award;
  }

  // 수상 내역 삭제
  static async deleteAward({ award_id }) {
    // 해당 내역 삭제
    const deletedAward = await Award.delete({ award_id });
    return deletedAward;
  }

  // user의 전체 수상 내역 삭제
  static async deleteAllAward({ user_id }) {
    const deletedAwards = await Award.deleteAll({ user_id });
    return;
  }
}

export { awardService };
