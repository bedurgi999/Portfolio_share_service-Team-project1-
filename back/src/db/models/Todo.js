import { TodoModel } from "../schemas/todo";
import { UserModel } from "../schemas/user";

class Todo {
  static async create({ newTodo }) {
    const createdNewTodo = await TodoModel.create(newTodo);
    return createdNewTodo;
  }

  static async findUserById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findByProceedingId({ proceeding_id }) {
    const todos = await TodoModel.find({ proceeding_id });
    return todos;
  }

  static async findByTodoId({ todo_id }) {
    const todos = await TodoModel.find({ todo_id });
    return todos;
  }

  static async update({ todo_id, toUpdate }) {
    const filter = { id: todo_id };
    const option = { returnOriginal: false };

    const updatedTodo = await TodoModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedTodo;
  }

  static async deleteTodo({ todo_id }) {
    const deletedTodo = await TodoModel.deleteOne({
      id: todo_id,
    });
    return deletedTodo;

  }

  static async deleteAll({ user_id }) {
    const deletedTodos = await TodoModel.deleteMany({ user_id: user_id });
    return deletedTodos;
  }

  static async deleteProceedingTodo({ proceeding_id }) {
    const deletedTodos = await TodoModel.deleteMany({ proceeding_id: proceeding_id });
    return deletedTodos;
  }

}

export { Todo };
