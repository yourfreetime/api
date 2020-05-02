const { gql } = require('apollo-server');

const UserType = gql`
  type User {
    name: String
    email: String
    password: String
    picture: String
    dateCreated: Date
    dateUpdated: Date
  }

  type Query {
    listUsers: [User]
  }
`;

export default UserType;
