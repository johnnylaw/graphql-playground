import User from "../../models/User";
import Article from "../../models/Article";
import Comment from "../../models/Comment";

export default {
  Query: {
    comment: async (parent, { _id }, context, info) => {
      return await Comment.find({ _id });
    },
    comments: async (parent, args, context, info) => {
      return new Promise((resolve, reject) => {
        Comment.find({})
        .populate()
        .exec((err, res) => {
          err ? reject(err) : resolve(res);
        })
      });
    },
  },
  Mutation: {
    createComment: async (parent, { comment }, context, info) => {
      const { currentUserId } = context;
      const newComment = await new Comment({
        text: comment.text,
        author: currentUserId,
        article: comment.article
      });

      return new Promise((resolve, reject) => {
        newComment.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    deleteComment: async (parent, { _id }, context, info) => {
      const { currentUserId } = context;
      const comment = await Comment.findById(_id);
      if (!comment) {
        throw new Error("Comment not found");
      }
      if (currentUserId === comment.author.toString()) {
        return new Promise((resolve, reject) => {
          Comment.findByIdAndDelete(_id).exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      } else {
        throw new Error("Not authorized")
      }
    }
  },
  Comment: {
    author: async ({ author }, args, context, info) => {
      return await User.findById({ _id: author });
    },
    article: async ({ article }, args, context, info) => {
      return await Article.findById({ _id: article });
    }
  }
};
