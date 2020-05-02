import { ApolloServer } from 'apollo-server';
import getTypes from './core/getTypes';
import PostResolver from './resolvers/PostResolver';

const server = new ApolloServer({
  typeDefs: getTypes(),
  resolvers: PostResolver
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
