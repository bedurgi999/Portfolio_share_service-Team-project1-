import { User } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userAuthService {
  // 유저 추가(회원 가입)
  static async addUser({ name, email, password, job }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword, job };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  // 로그인
  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const description = user.description;
    const job = user.job;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      job,
      errorMessage: null,
    };

    return loginUser;
  }

  // 유저 조회
  static async getUserInfo({ user_id }) {
    const user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }

  // 전체 유저 조회
  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  // 유저 정보 수정
  static async setUser({ user_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    
    // 변경 사항에 password 있을 시 암호화 해서 저장
    if (toUpdate.password) {
      toUpdate["password"] = await bcrypt.hash(toUpdate.password, 10);
    }

    // 수정해야하는 필드에 맞는 값을 업데이트
    const toUpdateField = Object.keys(toUpdate);

    toUpdateField.forEach(key => {
      if (!toUpdate[key]) delete toUpdate[key];
      if (key === "profile" && toUpdate[key] === "default") toUpdate[key] = null;
    });

    toUpdate.projectNum = toUpdate.projectNum ? toUpdate.projectNum : 0;

    user = await User.update({ user_id, toUpdate });
    return user;
  }

  // 유저 이메일과 임시 비밀번호로 유저 비밀번호 초기화
  static async resetPassword({ email, tempPassword }) {
    let user = await User.findByEmail({ email });

    if (!user) {
      const errorMessage =
        "해당 이메일은 존재하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const hashedPassword = await bcrypt.hash(tempPassword, 10); 
    const toUpdate = { password: hashedPassword };
    
    user = await User.update({ 
      user_id: user.id, 
      toUpdate 
    });
    
    return user;
  }

  // 유저 삭제 (회원 탈퇴)
  static async deleteUser({ user_id }) {
    // 해당 유저 삭제
    const deletedUser = await User.delete({ user_id });
    return deletedUser;
  }

}

export { userAuthService };
