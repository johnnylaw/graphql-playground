// The User schema.
import User from "../../../models/User";

export default {
  User: {
    passwordChanged: (parent, args, context) => {
      const { _id } = parent;
      console.log({ _id, value: _id.valueOf(), context })
      const { currentUserId } = context;
      if (_id.valueOf() !== currentUserId ) return 'redacted';
      return parent.passwordChanged;
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
    addUser: (root, { input: { firstName, lastName, email, password } }) => {
      const newUser = new User({ firstName, lastName, email, password });

      return new Promise((resolve, reject) => {
        newUser.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    editUser: (root, { id, firstName, lastName, email }) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate({ id }, { $set: { firstName, lastName, email } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteUser: (root, args) => {
      return new Promise((resolve, reject) => {
        User.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};