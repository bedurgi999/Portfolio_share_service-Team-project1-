import { Schema, model } from "mongoose";


const TodoSchema = new Schema(
  {
    id : {
        type:String,
        required:true
    },
    user_id: {
        type:String,
        required:true
    },
    proceeding_id : {
        type:String,
        required:true
    },
    todo : {
        type:String,
        required:true
    },
    finish : {
        type:Boolean,
        required:true
    }
});

const TodoModel = model("Todo", TodoSchema);

export { TodoModel };