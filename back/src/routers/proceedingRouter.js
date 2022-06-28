import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {
  isValidData,
  invalidCallback,
} from "../middlewares/validationMiddleware";

import { proceedingAuthService } from "../services/proceedingService";

const proceedingAuthRouter = Router();
proceedingAuthRouter.use(login_required);

// POST /proceeding/create : 진행중인 프로젝트 추가
proceedingAuthRouter.post(
  "/proceeding/create",
  isValidData("proceeding"),
  invalidCallback,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      const user_id = req.body.user_id;
      const title = req.body.title;
      const start_date = req.body.start_date;
      const end_date = req.body.end_date;

      const newProceeding = await proceedingAuthService.addProceeding({
        user_id,
        title,
        start_date,
        end_date,
      });
      if (newProceeding.errorMessage) {
        throw new Error(newProceeding.errorMessage);
      }
      res.status(201).json(newProceeding);
    } catch (error) {
      next(error);
    }
  }
);

// GET /proceedinglist/:user_id : user의 전체 진행중인 프로젝트 조회
proceedingAuthRouter.get("/proceedinglist/:user_id", async (req, res, next) => {
    try {
      const user_id = req.params.user_id;
      const proceedings = await proceedingAuthService.getProceedings({ user_id });
      res.status(200).send(proceedings);
    } catch (error) {
      next(error);
    }
});

// PUT /proceedings/:id : 진행중인 프로젝트 수정
proceedingAuthRouter.put("/proceedings/:id", async (req, res, next) => {
  try {
    const proceeding_id = req.params.id;
    const title = req.body.title ?? null;
    const start_date = req.body.start_date ?? null;
    const end_date = req.body.end_date ?? null;

    const toUpdate = { title, start_date, end_date };

    const updatedProceeding = await proceedingAuthService.setProceeding({
      proceeding_id,
      toUpdate,
    });
    if (updatedProceeding.errorMessage) {
      throw new Error(updatedProceeding.errorMessage);
    }
    res.status(200).json(updatedProceeding);
  } catch (error) {
    next(error);
  }
});

// DELETE /proceedings/:id : 진행중인 프로젝트 삭제
proceedingAuthRouter.delete("/proceedings/:id", async (req, res, next) => {
  try {
    const proceeding_id = req.params.id;
    const deletedProceeding = await proceedingAuthService.deleteProceeding({
      proceeding_id,
    });

    if (deletedProceeding.errorMessage) {
      throw new Error(deletedProceeding.errorMessage);
    }

    res.status(200).send("성공적으로 삭제가 완료되었습니다.");

  } catch (error) {
    next(error);
  }
});

// DELETE /proceedinglist/:user_id : user의 전체 진행중인 프로젝트 삭제
proceedingAuthRouter.delete("/proceedinglist/:user_id", async (req, res, next) => {
  try {
    // URI 파라미터에서 user_id 가져오기
    const { user_id } = req.params;
    // userId의 proceeding 데이터를 모두 삭제함
    await proceedingAuthService.deleteAllProceeding({ user_id });

    res.status(200).json('success');
  } catch (error) {
    next(error);
  }
});

export { proceedingAuthRouter };
