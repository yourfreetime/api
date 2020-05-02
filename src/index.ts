import { ApolloServer } from 'apollo-server';
import PostType from './types/PostType';
import PostResolver from './resolvers/PostResolver';

const server = new ApolloServer({
  typeDefs: PostType,
  resolvers: PostResolver
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
