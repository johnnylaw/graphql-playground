export default `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    passwordChanged: String!
    articles: [Article!]!
    comments: [Comment!]!
  }

  input AddUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Query {
    user(_id: ID!): User
    users: [User]
  }

  type Mutation {
    addUser(user: AddUserInput!): User
    editUser(_id: ID!, firstName: String, lastName: String, email: String): User
  }
`;