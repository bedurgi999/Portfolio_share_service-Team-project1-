import { ProceedingModel } from "../schemas/proceeding";
import { UserModel } from "../schemas/user";

class Proceeding {
  static async create({ newProceeding }) {
    const createdNewProceeding = await ProceedingModel.create(newProceeding);
    return createdNewProceeding;
  }
  
  static async findUserById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findByUserId({ user_id }) {
    const Proceedings = await ProceedingModel.find({ user_id });
    return Proceedings;
  }
  static async findByProceedingId({ proceeding_id }) {
    const proceeding = await ProceedingModel.findOne({ id: proceeding_id });
    return proceeding;
  }

  static async update({ proceeding_id, toUpdate }) {
    const filter = { id: proceeding_id };
    const option = { returnOriginal: false };

    const updatedProceeding = await ProceedingModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedProceeding;
  }

  static async deleteProceeding({ proceeding_id }) {
    const deletedProceeding = await ProceedingModel.deleteOne({
      id: proceeding_id,
    });
    return deletedProceeding;

  }

  // user_id를 이용하여 data 삭제
  static async deleteAll({ user_id }) {
    const deletedProceedings = await ProceedingModel.deleteMany({ user_id: user_id });
    return deletedProceedings;
  }
}

export { Proceeding };
