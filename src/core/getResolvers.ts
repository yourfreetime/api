import fs from 'fs';
import path from 'path';
import { DocumentNode, GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { AuthenticationError } from 'apollo-server';

const listScalars = ['Int', 'Float', 'String', 'Boolean', 'ID', 'Date'];

const getResolvers = (): any[] => {
  const basePathTypes = path.join(process.cwd(), '/dist/types');
  const basePathControllers = path.join(process.cwd(), '/dist/controllers');
  const files: string[] = fs.readdirSync(basePathTypes);

  let resolvers: any = { Query: {}, Mutation: {}, ...scalars() };

  files.forEach(file => {
    const nameController = file.replace('Type', 'Controller');

    if (!fs.existsSync(path.join(basePathControllers, nameController))) {
      throw new Error(`Controller '${nameController}' not exists`);
    }

    const Controller = require(path.join(basePathControllers, nameController))
      .default;
    const controller = new Controller();

    const type: DocumentNode = require(path.join(basePathTypes, file)).default;

    type.definitions.forEach((definition: any) => {
      if (definition.name.value === 'Query') {
        definition.fields.forEach((field: any) => {
          resolvers.Query[field.name.value] = (...params: any[]) => {
            if (!params[2].user) {
              throw new AuthenticationError('Not Authenticated');
            }

            return controller[field.name.value](...params);
          };
        });
      } else if (definition.name.value === 'Mutation') {
        definition.fields.forEach((field: any) => {
          if (!controller[field.name.value]) {
            throw new Error(
              `Function '${field.name.value}' not exists in '${nameController}'`
            );
          }

          resolvers.Mutation[field.name.value] = (...params: any[]) => {
            if (!params[2].user) {
              throw new AuthenticationError('Not Authenticated');
            }

            return controller[field.name.value](...params);
          };
        });
      } else {
        if (definition.kind === 'ObjectTypeDefinition') {
          const nameContext = file.replace('Type.js', '');
          resolvers[nameContext] = {};

          definition.fields.forEach((field: any) => {
            let type = null;
            if (field.type.kind === 'NamedType') {
              type = field.type;
            } else {
              type = field.type.type;
            }

            if (!listScalars.includes(type.name.value)) {
              const ControllerField = require(path.join(
                basePathControllers,
                `${type.name.value}Controller.js`
              )).default;

              const controllerField = new ControllerField();

              resolvers[nameContext][field.name.value] = (...params: any[]) =>
                controllerField[
                  `get${capitalize(field.name.value)}By${nameContext}`
                ](...params);
            }
          });

          if (Object.keys(resolvers[nameContext]).length === 0) {
            delete resolvers[nameContext];
          }
        }
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
      return value;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value);
      }
      return null;
    }
  })
});

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default getResolvers;
