import { mergeTypes } from "merge-graphql-schemas";

import User from "./User";
import Article from "./Article";

const typeDefs = [User, Article];

export default mergeTypes(typeDefs, { all: true });
