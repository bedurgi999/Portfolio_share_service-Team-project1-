import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ user_id, toUpdate }) {
    const filter = { id: user_id };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedUser;
  }

  static async delete({ user_id }) {
    const deletedUser = await UserModel.deleteOne({ id: user_id });
    return deletedUser;
  }
}

export { User };
