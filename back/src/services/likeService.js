import { Like } from "../db";

class likeService {
  // 좋아요 반영
  static async setLike({ user_id, project_id }) {
    const like = await Like.findData({ user_id, project_id });
    if (like) {
      const deletedLike = await Like.delete({ like_id: like._id });

      if (deletedLike.deletedCount !== 1) 
        return { errorMessage: "좋아요 취소 오류입니다." }
      
      return;

    } else {
      const newLike = { user_id, project_id };
      const createdNewLike = await Like.create({ newLike });
      createdNewLike.errorMessage = null;

      return createdNewLike;
    
    }
  }

  // 유저의 좋아요 목록 조회
  static async getLikes({ user_id }) {
    const likes = await Like.findByUserId({ user_id });
    return likes;
  }
  
  // 유저의 좋아요 목록 전체 삭제
  static async deleteAllLike({ user_id }) {
    const deleteLikes = await Like.deleteAll({ user_id });
    return;
  }

  // 좋아요 추가 (지금은 사용 x)
  static async addLike({ user_id, project_id }) {
    const like = await Like.findData({ user_id, project_id });
    if (like) {
      return { errorMessage: "좋아요는 한 번만 가능합니다." };
    }
    
    const newLike = { user_id, project_id };
    const createdNewLike = await Like.create({ newLike });
    createdNewLike.errorMessage = null;

    return createdNewLike;
  }
  
  // 좋아요 삭제 (지금은 사용 x)
  static async deleteLike({ like_id }) {
    const deletedLike = await Like.delete({ like_id });

    deletedLike.errorMessage = 
        (deletedLike.deletedCount === 1) ? null : "좋아요 취소 오류입니다.";

    return deletedLike;
  }
}

export { likeService };
