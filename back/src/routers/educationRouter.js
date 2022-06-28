import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
// create시 데이터 유효성 검사 middleware
import { isValidData, invalidCallback } from "../middlewares/validationMiddleware";
import { educationService } from "../services/educationService";

const educationRouter = Router();
// 로그인 유저만 사용할 수 있는 기능이므로 전체 기능에 적용
educationRouter.use(login_required);

// POST /education/create : 데이터 생성 
educationRouter.post("/education/create", 
  isValidData("education"),
  invalidCallback,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      // req(request).body 에서 데이터 가져오기
      const { user_id, school, major, position } = req.body;

      const newEducation = await educationService.addEducation({
        user_id,
        school,
        major,
        position
      });

      // educationService 내에서 감지한 오류가 있는 경우
      if (newEducation.errorMessage) {
        throw new Error(newEducation.errorMessage);
      }

      // status 201: 정상적으로 create 되었을 때
      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
    }
});

// GET /educationlist/:user_id : user의 education 데이터 조회
educationRouter.get("/educationlist/:user_id", async (req, res, next) => {
  try {
    // URI 파라미터에서 user_id 가져오기
    const { user_id } = req.params;
    // userId의 education 데이터를 모두 가져옴
    const education = await educationService.getEducations({ user_id });
    
    res.status(200).json(education);
  } catch (error) {
    next(error);
  }
});

// GET /educations/:id : education 상세 데이터 조회
educationRouter.get("/educations/:id", async (req, res, next) => {
  try {
    // URI 파라미터에서 id 가져오기
    const education_id = req.params.id;
    // id에 해당하는 상세 정보 가져옴
    const education = await educationService.getEducationInfo({ education_id });
    
    if (education?.message) {
      throw new Error(education.message);
    }
    
    res.status(200).json(education);
  } catch (error) {
    next(error);
  }
});

// PUT /educations/:id : education 데이터 수정
educationRouter.put("/educations/:id", async (req, res, next) => {
    try {
      const education_id = req.params.id;
      // 값이 넘어오지 않을 경우 (undefined) null로 변경
      const school = req.body.school ?? null;
      const major = req.body.major ?? null;
      const position = req.body.position ?? null;

      const toUpdate = { school, major, position };

      const updatedEducation = await educationService.setEducation({ education_id, toUpdate });

      if (updatedEducation.errorMessage) {
        throw new Error(updatedEducation.errorMessage);
      }

      res.status(200).json(updatedEducation);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /educations/:id : education 데이터 삭제
educationRouter.delete("/educations/:id", async (req, res, next) => {
  try {
    const education_id = req.params.id;
    const deletedEducation = await educationService.deleteEducation({ education_id });

    if (deletedEducation?.message) {
      throw new Error(deletedEducation.message);
    }

    res.status(204).send('success');
  } catch (error) {
    next(error);
  }
}
);

// DELETE /educationlist/:user_id : user의 education 데이터 전체 삭제
educationRouter.delete("/educationlist/:user_id", async (req, res, next) => {
  try {
    // URI 파라미터에서 user_id 가져오기
    const { user_id } = req.params;
    // userId의 education 데이터를 모두 삭제함
    await educationService.deleteAllEducation({ user_id });

    res.status(200).json('success');
  } catch (error) {
    next(error);
  }
});



export { educationRouter };
