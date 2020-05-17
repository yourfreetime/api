import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import apolloMergeTypes from 'apollo-merge-types';

import getResolvers from './core/getResolvers';
// @ts-ignore
import resolvers from './core/resolvers';
import createResolver from './core/createResolver';
import Loaders from './core/Loaders';

import LoginController from './controllers/LoginController';

dotenv.config();

createResolver();

const loaders = Loaders.Instance;

mongoose.connect(loaders.Database, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const app = express();
const loginController: LoginController = new LoginController();

const basePath = path.join(process.cwd(), '/dist/types');
const server = new ApolloServer({
  resolvers,
  typeDefs: apolloMergeTypes(basePath),
  context: loginController.validation.bind(loginController),
  introspection: true,
  playground: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.route('/login').post(loginController.login.bind(loginController));
app.route('/signup').post(loginController.signup.bind(loginController));

server.applyMiddleware({ app });

app.listen({ port: loaders.Port }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${loaders.Port}${server.graphqlPath}`
  );
});
