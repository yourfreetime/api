import { ApolloServer } from 'apollo-server';
import getTypes from './core/getTypes';
import getResolvers from './core/getResolvers';

const server = new ApolloServer({
  typeDefs: getTypes(),
  resolvers: getResolvers()
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
