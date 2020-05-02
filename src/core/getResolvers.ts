import fs from 'fs';
import path from 'path';
import { DocumentNode, GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const getResolvers = (): any[] => {
  const basePathTypes = path.join(process.cwd(), '/dist/types');
  const basePathControllers = path.join(process.cwd(), '/dist/controllers');
  const files: string[] = fs.readdirSync(basePathTypes);

  let resolvers: any = { Query: {}, Mutation: {}, ...scalars() };

  files.forEach(file => {
    const nameController = file.replace('Type', 'Controller');
    const Controller = require(path.join(basePathControllers, nameController))
      .default;
    const controller = new Controller();

    const type: DocumentNode = require(path.join(basePathTypes, file)).default;

    type.definitions.map((definition: any) => {
      if (definition.name.value === 'Query') {
        definition.fields.map((field: any, ...params: any[]) => {
          resolvers.Query[field.name.value] = controller[field.name.value].bind(
            controller,
            ...params
          );
        });
      } else if (definition.name.value === 'Mutation') {
        definition.fields.map((field: any, ...params: any[]) => {
          resolvers.Mutation[field.name.value] = controller[
            field.name.value
          ].bind(controller, ...params);
        });
      }
    });
  });

  if (Object.keys(resolvers.Query).length === 0) {
    delete resolvers.Query;
  }

  if (Object.keys(resolvers.Mutation).length === 0) {
    delete resolvers.Mutation;
  }

  return resolvers;
};

const scalars = () => ({
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value);
      }
      return null;
    }
  })
});

export default getResolvers;
