import fs from 'fs';
import path from 'path';
import { DocumentNode } from 'graphql';

const getResolvers = (): any[] => {
  const basePathTypes = path.join(process.cwd(), '/dist/types');
  const basePathControllers = path.join(process.cwd(), '/dist/controllers');
  const files: string[] = fs.readdirSync(basePathTypes);

  let resolvers: any = { Query: {} };

  files.map(file => {
    const nameController = file.replace('Type', 'Controller');
    const Controller = require(path.join(basePathControllers, nameController))
      .default;
    const controller = new Controller();

    const type: DocumentNode = require(path.join(basePathTypes, file)).default;

    type.definitions.map((definition: any) => {
      if (definition.name.value === 'Query') {
        definition.fields.map((field: any) => {
          resolvers.Query[field.name.value] = controller[field.name.value];
        });
      }
    });
  });

  return resolvers;
};

export default getResolvers;
