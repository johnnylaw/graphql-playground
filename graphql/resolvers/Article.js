import User from "../../models/User";
import Article from "../../models/Article";
import Comment from "../../models/Comment";

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
    createArticle: async (root, { article: { title, body } }, context, info) => {
      const { currentUserId } = context;
      const authors = [currentUserId];
      const datePublished = null;
      const newArticle = new Article({
        title,
        body,
        authors,
        datePublished,
      });

      try {
        const result = await new Promise((resolve, reject) => {
          newArticle.save((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
        const creator = await User.findById(currentUserId);

        if (!creator) {
          throw new Error("User not found.");
        }
        return newArticle;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    addAuthorToArticle: async(
      parent, { authorId: author, articleId: article }, context, info
    ) => {
      const { currentUserId } = context;
      article = await Article.findById(article);
      if (!article) {
        throw new Error("Article not found");
      }
      let { authors } = article;
      authors = authors.map(author => author.toString());
      if (!authors.includes(currentUserId)) {
        throw new Error("Not authorized to add author");
      }
      if (!authors.includes(author)) {
        article.authors.push(author);
        await article.save();
      }
      return article;
    },
  },
  Article: {
    authors: async ({ authors }, args, context, info) => {
      return authors.map(async(author) => await User.findById(author));
    },
    comments: async ({ _id: article }, args, context, info) => {
      return await Comment.find({ article });
    }
  }
};
