const { gql } = require('apollo-server');

const PostType = gql`
  type Post {
    id: String
    text: String
    author: User
    dateCreated: Date
    dateUpdated: Date
  }
  input PostCreate {
    text: String!
    authorId: String!
  }
  input PostUpdate {
    text: String!
    postId: String!
  }
  input PostDelete {
    postId: String!
  }
  type Query {
    listPosts: [Post]
  }
  type Mutation {
    createPost(input: PostCreate): Post
    updatePost(input: PostUpdate): Post
    deletePost(input: PostDelete): Boolean
  }
`;

export default PostType;
