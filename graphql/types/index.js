import { mergeTypes } from "merge-graphql-schemas";

import User from "./User";
import Article from "./Article";
import Comment from "./Comment";

const typeDefs = [User, Article, Comment];

export default mergeTypes(typeDefs, { all: true });
