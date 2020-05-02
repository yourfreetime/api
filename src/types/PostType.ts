const { gql } = require('apollo-server');

const PostType = gql`
  type Post {
    text: String
    author: User
    dateCreated: Date
    dateUpdated: Date
  }
  input PostCreate {
    text: String!
    authorId: String!
  }
  type Query {
    listPosts: [Post]
  }
  type Mutation {
    createPost(input: PostCreate): Post
  }
`;

export default PostType;
