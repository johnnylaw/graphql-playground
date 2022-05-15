import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User";
import Article from "./Article";

const resolvers = [User, Article];

export default mergeResolvers(resolvers);
