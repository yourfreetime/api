const { gql } = require('apollo-server');

const SavedPostType = gql`
  type SavedPost {
    id: String
    date: Date
    post: Post
  }
  input SavedPostForm {
    postId: String!
  }
  type Mutation {
    createSavedPost(input: SavedPostForm!): [SavedPost]
    deleteSavedPost(input: SavedPostForm!): [SavedPost]
  }
`;

export default SavedPostType;
