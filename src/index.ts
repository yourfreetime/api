import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server';
import getTypes from './core/getTypes';
import getResolvers from './core/getResolvers';

const server = new ApolloServer({
  resolvers: getResolvers(),
  typeDefs: getTypes()
});

const ipMongo = process.env.IP_MONGO || 'localhost';
const baseMongo = process.env.BASE_MONGO || 'yourfreetime';
const usrMongo = process.env.USR_MONGO;
const pswMongo = process.env.PSW_MONGO;

if (usrMongo) {
  mongoose.connect(
    `mongodb://${usrMongo}:${pswMongo}@${ipMongo}/${baseMongo}`,
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
} else {
  mongoose.connect(`mongodb://${ipMongo}/${baseMongo}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
}

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
