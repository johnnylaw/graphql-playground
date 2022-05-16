import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  datePublished: {
    type: String,
    required: false,
  }
});

articleSchema.virtual('published').get(function() {
  return !!this.datePublished;
});

export default mongoose.model("Article", articleSchema);

