import fs from 'fs';
import path from 'path';
import { DocumentNode } from 'graphql';

const getTypes = (): DocumentNode[] => {
  const basePath = path.join(process.cwd(), '/dist/types');
  const files: string[] = fs.readdirSync(basePath);

  const types = files.reduce(
    (acc: any[], item) => [...acc, require(path.join(basePath, item)).default],
    []
  );

  return types;
};

export default getTypes;
