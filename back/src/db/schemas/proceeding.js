import mongoose, { Schema, model } from "mongoose";

const ProceedingSchema = new Schema(
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
    title:{
        type: String,
        required: true,
    },
    start_date: {
      type: String,
      required: true,
    },
    end_date: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProceedingModel = model("Proceeding", ProceedingSchema);

export { ProceedingModel };
