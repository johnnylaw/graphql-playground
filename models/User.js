import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const Schema = mongoose.Schema;

ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordChanged: {
    type: String,
    required: true,
  },
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article"
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const password = userSchema.virtual('password');
password.set(function(value, virtual, doc) {
  // Do something with password, e.g. encrypt and save
  const date = new Date
  doc.passwordChanged = date.toString();
});

const User = mongoose.model("User", userSchema);

export default User;