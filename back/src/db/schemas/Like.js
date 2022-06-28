import { Schema, model } from "mongoose";

const LikeSchema = new Schema(
  {
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    project_id: {
      type: String,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LikeModel = model("Like", LikeSchema);

export { LikeModel };