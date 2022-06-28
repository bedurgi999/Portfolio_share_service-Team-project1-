import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class certificateAuthService {
  // 자격증 추가
  static async addCertificate({ user_id, title, description, when_date }) {
    const user = await Certificate.findUserById({ user_id });
    if (user.length === 0) {
      const errorMessage = "존재하지 않는 사용자입니다.";
      return { errorMessage };
    }

    const certificate_id = uuidv4();

    const newCertificate = {
      id: certificate_id,
      user_id,
      title,
      description,
      when_date,
    };

    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewCertificate;
  }

  // 자격증 정보 조회
  static async getCertificateInfo({ certificate_id }) {
    const certificate = await Certificate.findByCertificateId({
      certificate_id,
    });

    if (!certificate) {
      const errorMessage =
        "자격증 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return certificate;
  }

  // 유저의 모든 자격증 조회
  static async getCertificates({ user_id }) {
    const certificates = await Certificate.findByUserId({ user_id });
    return certificates;
  }

  // 자격증 수정
  static async setCertificate({ certificate_id, toUpdate }) {
    let certificate = await Certificate.findByCertificateId({ certificate_id });

    if (!certificate) {
      const errorMessage =
        "자격증 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 수정해야하는 필드에 맞는 값을 업데이트
    const toUpdateField = Object.keys(toUpdate);

    toUpdateField.forEach(key => {
      if (!toUpdate[key]) delete toUpdate[key];
    });

    certificate = await Certificate.update({ certificate_id, toUpdate });
    return certificate;
  }

  // 자격증 삭제
  static async deleteCertificate({ certificate_id }) {
    const deletedCertificate = await Certificate.deleteCertificate({
      certificate_id,
    });

    if (!deletedCertificate) {
      const errorMessage =
        "자격증 정보가 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return deletedCertificate;

  }

  // 유저의 모든 자격증 삭제
  static async deleteAllCertificate({ user_id }) {
    const deleteCertificates = await Certificate.deleteAll({ user_id });
    return;
  }
}

export { certificateAuthService };
