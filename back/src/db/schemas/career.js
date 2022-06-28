import { Schema, model } from "mongoose";

const CareerSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    job_position: {
      type: String,
      required: true,
    },
    achievement: {
      type: String,
      required: false,
      default: "주요 성과에 대해 기록해주세요.",
    },
    from_date: {
      type: String,
      required: true,
    },
    to_date: {
      type: String,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const CareerModel = model("Career", CareerSchema);

export { CareerModel };
