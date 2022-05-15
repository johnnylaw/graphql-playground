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
  published: {
    type: Boolean,
    default: true
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
  date: {
    published: {
      type: Date,
      default: Date.now()
    },
    updated: {
      type: Date,
      default: Date.now()
    }
  }
});

export default mongoose.model("Article", articleSchema);

