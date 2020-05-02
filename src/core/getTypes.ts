import fs from 'fs';
import path from 'path';
import { DocumentNode, DefinitionNode } from 'graphql';
import { gql } from 'apollo-server';

const getTypes = (): DocumentNode => {
  const basePath = path.join(process.cwd(), '/dist/types');
  const files: string[] = fs.readdirSync(basePath);

  let definitions: DefinitionNode[] = [...scalars().definitions];
  let Query: any;
  let Mutation: any;

  files.forEach(item => {
    const type: DocumentNode = require(path.join(basePath, item)).default;

    type.definitions.forEach((definition: any) => {
      if (definition.name.value === 'Query') {
        if (!Query) {
          Query = definition;
        } else {
          Query.fields = [...Query.fields, ...definition.fields];
        }
      } else if (definition.name.value === 'Mutation') {
        if (!Mutation) {
          Mutation = definition;
        } else {
          Mutation.fields = [...Mutation.fields, ...definition.fields];
        }
      } else {
        definitions.push(definition);
      }
    });
  });

  Query && definitions.push(Query);
  Mutation && definitions.push(Mutation);

  return { kind: 'Document', definitions };
};

const scalars = () => gql`
  scalar Date
`;

export default getTypes;
