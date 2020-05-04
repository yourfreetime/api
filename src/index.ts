import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import getTypes from './core/getTypes';
import getResolvers from './core/getResolvers';
import Loaders from './utils/loaders';

const loaders = Loaders.Instance;

const server = new ApolloServer({
  resolvers: getResolvers(),
  typeDefs: getTypes()
});

mongoose.connect(loaders.Database, { useUnifiedTopology: true, useNewUrlParser: true });

server.listen(loaders.Port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
