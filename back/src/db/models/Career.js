import { CareerModel } from "../schemas/career";

class Career {
  static async create({ newCareer }) {
    const createdNewCareer = await CareerModel.create(newCareer);
    return createdNewCareer;
  }

  static async findById({ career_id }) {
    const career = await CareerModel.findOne({ id: career_id });
    return career;
  }

  static async findByUserId({ user_id }) {
    const careers = await CareerModel.find({ user_id });
    return careers;
  }

  static async update({ career_id, toUpdate }) {
    const filter = { id: career_id };
    const option = { returnOriginal: false };

    const updatedCareer = await CareerModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedCareer;
  }

  static async delete({ career_id }) {
    const deletedCareer = await CareerModel.deleteOne({ id: career_id });
    return deletedCareer;
  }

  static async deleteAll({ user_id }) {
    const deletedCareers = await CareerModel.deleteMany({ user_id: user_id });
    return deletedCareers;
  }
}

export { Career };
