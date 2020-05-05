import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import getTypes from './core/getTypes';
import getResolvers from './core/getResolvers';
import Loaders from './core/Loaders';

dotenv.config();

const loaders = Loaders.Instance;

const server = new ApolloServer({
  resolvers: getResolvers(),
  typeDefs: getTypes()
});

mongoose.connect(loaders.Database, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

server.listen(loaders.Port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
