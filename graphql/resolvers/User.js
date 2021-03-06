import User from "../../models/User";
import Article from "../../models/Article";
import Comment from "../../models/Comment";

export default {
  User: {
    passwordChanged: (parent, args, context) => {
      const { _id } = parent;
      const { currentUserId } = context;
      if (_id.valueOf() !== currentUserId ) return 'REDACTED';
      return parent.passwordChanged;
    },
    email: (parent, args, context) => {
      const { _id } = parent;
      const { currentUserId } = context;
      if (_id.valueOf() !== currentUserId ) return 'REDACTED';
      return parent.email;
    },
    articles: async ({ _id: authors }, args, context, info) => {
      return await Article.find({ authors })
    },
    comments: async({ _id: author }, args, context, info) => {
      return await Comment.find({ author });
    },
  },
  Query: {
    user: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    users: (root, args) => {
      return new Promise((resolve, reject) => {
        User.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Mutation: {
    addUser: (root, { user }) => {
      const newUser = new User(user);

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    editUser: (root, { _id, firstName, lastName, email }, context) => {
      const { currentUserId } = context;
      if (currentUserId !== _id) {
        throw new Error("User not found");
      }
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ _id }, { $set: { firstName, lastName, email } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
  }
};
