import User from "../../models/User";
import Article from "../../models/Article";
// import Comment from "../../models/Comment";

// import { transformArticle } from "../merge";

export default {
  Query: {
    article: async (parent, { _id }, context, info) => {
      return await Article.findOne({ _id }).exec();
    },
    articles: async (parent, args, context, info) => {
      return new Promise((resolve, reject) => {
        Article.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    }
  },
  Mutation: {
    createArticle: async (parent, { article }, context, info) => {
      const { currentUserId } = context;
      const newArticle = await new Article({
        title: article.title,
        body: article.body,
        published: article.published,
        authors: [currentUserId],
        date: article.date
      });
      // let createdArticle;
      try {
        const result = await new Promise((resolve, reject) => {
          newArticle.save((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
        // createdArticle = transformArticle(result);
        const creator = await User.findById(currentUserId);

        if (!creator) {
          throw new Error("User not found.");
        }
        creator.articles.push(newArticle);
        await creator.save();
        return newArticle; //createdArticle;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    // updateArticle: async (parent, { _id, article }, context, info) => {
    //   return new Promise((resolve, reject) => {
    //     Article.findByIdAndUpdate(_id, { $set: { ...article } }, { new: true }).exec(
    //       (err, res) => {
    //         err ? reject(err) : resolve(res);
    //       }
    //     );
    //   });
    // },
    deleteArticle: async (parent, { _id }, context, info) => {
      try {
        // searching for creator of the article and deleting it from the list
        const article = await Article.findById(_id);
        const creator = await User.findById(article.author);
        if (!creator) {
          throw new Error("user not found.");
        }
        const index = creator.articles.indexOf(_id);
        if (index > -1) {
          creator.articles.splice(index, 1);
        }
        await creator.save();
        return new Promise((resolve, reject) => {
          Article.findByIdAndDelete(_id).exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  Article: {
    authors: async ({ authors }, args, context, info) => {
      return authors.map(async(author) => await User.findById(author));
    },
    // comments: async ({ author }, args, context, info) => {
    //   return await Comment.find({ author });
    // }
  }
};
