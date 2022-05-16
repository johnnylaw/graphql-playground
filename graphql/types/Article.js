export default `
  type Article {
    _id: ID!
    title: String
    body: String!
    published: Boolean!
    datePublished: String
    authors: [User!]
    comments: [Comment!]!
  }

  type Query {
    article(_id: ID!): Article!
    articles: [Article!]!
  }

  type Mutation {
    createArticle(article: CreateArticleInput): Article!
    addAuthorToArticle(articleId: ID!, authorId: ID!): Article!
    deleteArticle(_id: ID!): Article!
  }

  input CreateArticleInput {
    title: String!
    body: String!
  }
`
