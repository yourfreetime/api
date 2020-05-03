const { gql } = require('apollo-server');

const FollowType = gql`
  type Follow {
    user: User
    userFollow: User
    date: Date
  }
  input FollowForm {
    userId: String!
    userFollowId: String!
  }
  input FollowFilter {
    userId: String!
  }
  type Query {
    listFollowers(filter: FollowFilter!): [Follow]
    listFollowing(filter: FollowFilter!): [Follow]
  }
  type Mutation {
    createFollow(input: FollowForm!): [Follow]
    deleteFollow(input: FollowForm!): [Follow]
  }
`;

export default FollowType;
