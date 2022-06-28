import { EducationModel } from "../schemas/education";

// Education DB CRUD 기능 구현
class Education {
  // 새로운 data를 추가
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  // data의 ID를 통해 검색
  static async findById({ education_id }) {
    const education = await EducationModel.findOne({ id: education_id });
    return education;
  }

  // user_id가 같은 모든 data 검색
  static async findByUserId({ user_id }) {
    const educations = await EducationModel.find({ user_id });
    return educations;
  }
  
  static async update({ education_id, toUpdate }) {
    const filter = { id: education_id };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );
    return updatedEducation;
  }

  // id를 이용하여 data 삭제
  static async delete({ education_id }) {
    const deletedEducation = await EducationModel.deleteOne({ id: education_id });
    return deletedEducation;
  }

  // user_id를 이용하여 data 삭제
  static async deleteAll({ user_id }) {
    const deletedEducations = await EducationModel.deleteMany({ user_id: user_id });
    return deletedEducations;
  }
}

export { Education };
