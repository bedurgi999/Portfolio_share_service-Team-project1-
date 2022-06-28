import { LikeModel } from "../schemas/like";

class Like {
  static async create({ newLike }) {
    const createdNewLike = await LikeModel.create(newLike);
    return createdNewLike;
  }

  static async findById({ like_id }) {
    const like = await LikeModel.findOne({ _id: like_id });
    return like;
  }

  static async findData({ user_id, project_id }) {
    const like = await LikeModel.findOne({ user_id, project_id });
    return like;
  }

  static async findByUserId({ user_id }) {
    const likes = await LikeModel.find({ user_id }).select({_id: 0, project_id: 1});
    return likes;
  }

  static async delete({ like_id }) {
    const deletedLike = await LikeModel.deleteOne({ _id: like_id });
    return deletedLike;
  }

  static async deleteAll({ user_id }) {
    const deletedLikes = await LikeModel.deleteMany({ user_id });
    return deletedLikes;
  }
}

export { Like };
