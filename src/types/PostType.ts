const { gql } = require('apollo-server');

const PostType = gql`
  type Post {
    title: String
    author: String
  }

  type Query {
    getPosts: [Post]
  }
`;

export default PostType;
