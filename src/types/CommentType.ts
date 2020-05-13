const { gql } = require('apollo-server');

const CommentType = gql`
  type Comment {
    id: String
    text: String
    user: User
    dateCreated: Date
    dateUpdated: Date
  }
  input CommentCreate {
    postId: String!
    text: String!
  }
  input CommentUpdate {
    postId: String!
    text: String!
    commentId: String!
  }
  input CommentDelete {
    postId: String!
    commentId: String!
  }
  type Mutation {
    createComment(input: CommentCreate!): [Comment]
    updateComment(input: CommentUpdate!): [Comment]
    deleteComment(input: CommentDelete!): [Comment]
  }
`;

export default CommentType;
