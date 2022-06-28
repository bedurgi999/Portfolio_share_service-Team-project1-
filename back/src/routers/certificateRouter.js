import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {
  isValidData,
  invalidCallback,
} from "../middlewares/validationMiddleware";
import { certificateAuthService } from "../services/certificateService";

const certificateAuthRouter = Router();
certificateAuthRouter.use(login_required);

// POST /certificate/create : certificate 데이터 생성
certificateAuthRouter.post(
  "/certificate/create",
  isValidData("certificate"),
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
      const description = req.body.description;
      const when_date = req.body.when_date;

      const newCertificate = await certificateAuthService.addCertificate({
        user_id,
        title,
        description,
        when_date,
      });

      if (newCertificate.errorMessage) {
        throw new Error(newCertificate.errorMessage);
      }

      res.status(201).json(newCertificate);
    } catch (error) {
      next(error);
    }
  }
);

// GET /certificates/:id : certificate 데이터 조회
certificateAuthRouter.get("/certificates/:id", async (req, res, next) => {
  try {
    const certificate_id = req.params.id;
    const currentCertificateInfo =
      await certificateAuthService.getCertificateInfo({
        certificate_id,
      });

    if (currentCertificateInfo.errorMessage) {
      throw new Error(currentCertificateInfo.errorMessage);
    }

    res.status(200).send(currentCertificateInfo);
  } catch (error) {
    next(error);
  }
});

// GET /certificatelist/:user_id : user의 전체 certificate 데이터 조회
certificateAuthRouter.get(
  "/certificatelist/:user_id",
  async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const certificates = await certificateAuthService.getCertificates({
        user_id,
      });
      res.status(200).send(certificates);
    } catch (error) {
      next(error);
    }
  }
);

// POST /certificates/:id : certificate 데이터 수정
certificateAuthRouter.put("/certificates/:id", async (req, res, next) => {
  try {
    const certificate_id = req.params.id;

    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const when_date = req.body.when_date ?? null;
    const toUpdate = { title, description, when_date };

    const updatedCertificate = await certificateAuthService.setCertificate({
      certificate_id,
      toUpdate,
    });

    if (updatedCertificate.errorMessage) {
      throw new Error(updatedCertificate.errorMessage);
    }

    res.status(200).json(updatedCertificate);
  } catch (error) {
    next(error);
  }
});

// DELETE /certificates/:id : certificate 데이터 삭제
certificateAuthRouter.delete("/certificates/:id", async (req, res, next) => {
  try {
    const certificate_id = req.params.id;
    const deletedCertificate = await certificateAuthService.deleteCertificate({
      certificate_id,
    });

    if (deletedCertificate.errorMessage) {
      throw new Error(deletedCertificate.errorMessage);
    }

    res.status(200).send("성공적으로 삭제가 완료되었습니다.");

  } catch (error) {
    next(error);
  }
});

// DELETE /certificatelist/:user_id : user의 전체 certificate 데이터 삭제
certificateAuthRouter.delete("/certificatelist/:user_id", async (req, res, next) => {
  try {
    // URI 파라미터에서 user_id 가져오기
    const { user_id } = req.params;
    // userId의 certificate 데이터를 모두 삭제함
    await certificateAuthService.deleteAllCertificate({ user_id });

    res.status(200).json('success');
  } catch (error) {
    next(error);
  }
});

export { certificateAuthRouter };
