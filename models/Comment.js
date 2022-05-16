import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  }
});

export default mongoose.model("Comment", commentSchema);
