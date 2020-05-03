const { gql } = require('apollo-server');

const UserType = gql`
  type User {
    id: String
    name: String
    email: String
    picture: String
    dateCreated: Date
    dateUpdated: Date
  }
  input UserCreate {
    name: String!
    email: String!
    picture: String!
    password: String!
  }
  type Query {
    listUsers: [User]
  }
  type Mutation {
    createUser(input: UserCreate): User
  }
`;

export default UserType;
