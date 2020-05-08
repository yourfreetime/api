const { gql } = require('apollo-server');

const DateType = gql`
  scalar Date
`;

export default DateType;
