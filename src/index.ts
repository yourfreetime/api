import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';

import getTypes from './core/getTypes';
import getResolvers from './core/getResolvers';
import Loaders from './core/Loaders';

import LoginController from './controllers/LoginController';

dotenv.config();

const loaders = Loaders.Instance;

mongoose.connect(loaders.Database, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const app = express();
const loginController: LoginController = new LoginController();

const server = new ApolloServer({
  resolvers: getResolvers(),
  typeDefs: getTypes(),
  context: loginController.validation.bind(loginController)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/login').post(loginController.login.bind(loginController));
app.route('/signup').post(loginController.signup.bind(loginController));

server.applyMiddleware({ app });

app.listen({ port: loaders.Port }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
