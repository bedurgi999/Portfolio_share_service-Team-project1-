import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { likeService } from "../services/likeService";

const likeRouter = Router();
likeRouter.use(login_required);

// POST /setlike  : 좋아요 반영
likeRouter.post(
  "/setlike",
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      const { user_id, project_id } = req.body;
      const like = await likeService.setLike({ user_id, project_id });

      if (!like) {
        res.status(200).json({type: "delete", project_id});
      } else if (like.errorMessage) {
        throw new Error(like.errorMessage);
      } else {
        res.status(201).json({ type: "create", project_id });
      }

    } catch (error) {
      next(error);
    }
  }
);

// GET /likes/:user_id : 좋아요 목록 조회
likeRouter.get("/likes/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const likes = await likeService.getLikes({ user_id });

    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
});


// POST /like : 좋아요 추가
likeRouter.post("/like", async (req, res, next) => {
  try {
    const { user_id, project_id } = req.body;
    const newLike = await likeService.addLike({ user_id, project_id });

    if (newLike.errorMessage) {
        res.status(400).send("fail");
    }
    
    res.status(201).send("success");
  } catch (error) {
      next(error);
  };
});

// DELETE /likes/:id : 좋아요 취소
likeRouter.delete("/likes/:id", async (req, res, next) => {
  try {
    const like_id = req.params.id;
    const deletedLike = await likeService.deleteLike({ like_id });

    if (deletedLike.errorMessage) {
      throw new Error(deletedLike.errorMessage);
    }

    res.status(200).send("성공적으로 삭제가 완료되었습니다.");
  } catch (error) {
    next(error);
  }
});

// DELETE /likelist/:user_id : user의 전체 프로젝트 삭제
likeRouter.delete("/likelist/:user_id", async (req, res, next) => {
  try {
    // URI 파라미터에서 user_id 가져오기
    const { user_id } = req.params;
    // userId의 project 데이터를 모두 삭제함
    await likeService.deleteAllLike({ user_id });

    res.status(200).json("success");
  } catch (error) {
    next(error);
  }
});

export { likeRouter };
