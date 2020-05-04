const { gql } = require('apollo-server');

const LikeType = gql`
  type Like {
    user: User
    date: Date
  }
  input LikeForm {
    postId: String!
    userId: String!
  }
  type Mutation {
    createLike(input: LikeForm): [Like]
    deleteLike(input: LikeForm): [Like]
  }
`;

export default LikeType;
