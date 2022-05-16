import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User";
import Article from "./Article";
import Comment from "./Comment";

const resolvers = [User, Article, Comment];

export default mergeResolvers(resolvers);
