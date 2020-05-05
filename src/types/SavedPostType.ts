const { gql } = require('apollo-server');

const SavedPostType = gql`
  type SavedPost {
    date: Date
    post: Post
  }
  input SavedPostForm {
    postId: String!
    userId: String!
  }
  type Mutation {
    createSavedPost(input: SavedPostForm!): [SavedPost]
    deleteSavedPost(input: SavedPostForm!): [SavedPost]
  }
`;

export default SavedPostType;
