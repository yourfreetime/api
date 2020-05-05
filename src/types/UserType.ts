const { gql } = require('apollo-server');

const UserType = gql`
  type User {
    id: String
    name: String
    email: String
    picture: String
    savedPosts: [SavedPost]
    dateCreated: Date
    dateUpdated: Date
  }
  input UserCreate {
    name: String!
    email: String!
    picture: String!
    password: String!
  }
  input UserUpdate {
    name: String
    email: String
    picture: String
    password: String
    userId: String!
  }
  input UserDelete {
    userId: String!
  }
  input LocationSet {
    latitude: Float!
    longitude: Float!
    userId: String!
  }
  type Query {
    listUsers: [User]
  }
  type Mutation {
    createUser(input: UserCreate!): User
    updateUser(input: UserUpdate!): User
    deleteUser(input: UserDelete!): Boolean
    setLocation(input: LocationSet!): User
  }
`;

export default UserType;
