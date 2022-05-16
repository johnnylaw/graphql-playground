export default `
  type Comment {
    _id: ID!
    text: String!
    author: User!
    article: Article!
  }

  type Query {
    comment(_id: ID!): [Comment!]!
    comments: [Comment!]!
  }

  type Mutation {
    createComment(comment: CreateCommentInput!): Comment!
    deleteComment(_id: ID!): Comment!
  }

  input CreateCommentInput {
    text: String!
    article: ID!
  }
`;
