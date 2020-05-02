const { gql } = require('apollo-server');

export default gql`
  type Post {
    title: String
    author: String
  }

  type Query {
    posts: [Post]
  }
`;
