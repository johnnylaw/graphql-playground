export default `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    passwordChanged: String!
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
    addUser(input: AddUserInput!): User
    editUser(_id: ID!, firstName: String, lastName: String, email: String): User
    deleteUser(_id: ID!): User
  }
`;