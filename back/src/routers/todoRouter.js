import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {
  isValidData,
  invalidCallback,
} from "../middlewares/validationMiddleware";

import { todoAuthService } from "../services/todoService";

const todoAuthRouter = Router();
todoAuthRouter.use(login_required);

// POST /todo/create : 할 일 추가
todoAuthRouter.post(
  "/todo/create",
  isValidData("todo"),
  invalidCallback,
  async (req, res, next) => {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요"
        );
      }
      const user_id = req.body.user_id;
      const proceeding_id = req.body.proceeding_id;
      const todo = req.body.todo;
      const finish = req.body.finish;


      const newTodo = await todoAuthService.addTodo({
        user_id,
        proceeding_id,
        todo,
        finish,
      });
      if (newTodo.errorMessage) {
        throw new Error(newTodo.errorMessage);
      }
      res.status(201).json(newTodo);
    } catch (error) {
      next(error);
    }
  }
);

// GET /todolist/:preceeding_id : 진행중인 프로젝트의 할 일 조회
todoAuthRouter.get("/todolist/:proceeding_id", async (req, res, next) => {
  try {
    const proceeding_id = req.params.proceeding_id;
    const todos = await todoAuthService.getTodos({ proceeding_id });
    res.status(200).send(todos);
  } catch (error) {
    next(error);
  }
});

// PUT /todo/:id : 할 일 수정
todoAuthRouter.put("/todo/:id", async (req, res, next) => {
  try {
    const todo_id = req.params.id;

    const todo = req.body.todo ?? null;
    const finish = req.body.finish ?? null;

    const toUpdate = { todo, finish };

    const updatedTodo = await todoAuthService.setTodo({
      todo_id,
      toUpdate,
    });
    if (updatedTodo.errorMessage) {
      throw new Error(updatedTodo.errorMessage);
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
});

// DELETE /todo/:id : 할 일 삭제
todoAuthRouter.delete("/todo/:id", async (req, res, next) => {
  try {
    const todo_id = req.params.id;
    const deletedTodo = await todoAuthService.deleteTodo({
      todo_id,
    });

    if (deletedTodo.errorMessage) {
      throw new Error(deletedTodo.errorMessage);
    }

    res.status(200).send("성공적으로 삭제가 완료되었습니다.");

  } catch (error) {
    next(error);
  }
});

// DELETE /todolist/:user_id : user의 전체 할 일 삭제
todoAuthRouter.delete("/todolist/:user_id", async (req, res, next) => {
  try {
    // URI 파라미터에서 user_id 가져오기
    const { user_id } = req.params;
    console.log(user_id);
    // userId의 Todo 데이터를 모두 삭제함
    await todoAuthService.deleteAllTodo({ user_id });

    res.status(200).json('success');
  } catch (error) {
    next(error);
  }
});

todoAuthRouter.delete("/proceedingtodo/:proceeding_id", async (req, res, next) => {
  try {
    // URI 파라미터에서 user_id 가져오기
    const { proceeding_id } = req.params;
    // userId의 Todo 데이터를 모두 삭제함
    await todoAuthService.deleteOneTodoList({ proceeding_id });

    res.status(200).json('success');
  } catch (error) {
    next(error);
  }
});

export { todoAuthRouter };
