import fs from 'fs';
import path from 'path';
import { DocumentNode, GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { AuthenticationError } from 'apollo-server';

const listScalars = ['Int', 'Float', 'String', 'Boolean', 'ID', 'Date'];
const basePathControllers = path.join(process.cwd(), '/dist/controllers');
const basePathValidator = path.join(process.cwd(), '/dist/validators');

const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const read = () => {
  const basePathTypes = path.join(process.cwd(), '/dist/types');
  const files: string[] = fs.readdirSync(basePathTypes);

  let ast: any = {
    controllers: [],
    functions: [],
    validators: []
  };

  files.forEach(file => {
    const nameController = file.replace('Type', 'Controller');
    const nameValidator = file.replace('Type', 'Validator');
    const type: DocumentNode = require(path.join(basePathTypes, file)).default;

    if (fs.existsSync(path.join(basePathControllers, nameController))) {
      ast.controllers.push({
        name: nameController.replace('.js', '')
      });
    }

    if (fs.existsSync(path.join(basePathValidator, nameValidator))) {
      ast.validators.push({
        name: nameValidator.replace('.js', '')
      });
    }

    type.definitions.forEach((definition: any) => {
      if (
        definition.name.value === 'Query' ||
        definition.name.value === 'Mutation' ||
        definition.name.value === 'Subscription'
      ) {
        definition.fields.forEach((field: any) => {
          ast.functions.push({
            type: definition.name.value,
            name: field.name.value,
            context: file.replace('Type.js', '')
          });
        });
      } else if (definition.kind === 'ObjectTypeDefinition') {
        definition.fields.forEach((field: any) => {
          let subtype = field.type;
          if (field.type.kind !== 'NamedType') {
            subtype = field.type.type;
          }

          if (!listScalars.includes(subtype.name.value)) {
            ast.functions.push({
              isReference: true,
              type: file.replace('Type.js', ''),
              name: field.name.value,
              context: subtype.name.value
            });
          }
        });
      }
    });
  });

  return ast;
};

const write = (ast: any) => {
  let content = ``;
  let schemas = ast.functions.reduce((acc: any, item: any) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);

    return acc;
  }, {});

  ast.controllers.forEach((controller: any) => {
    content += `const ${controller.name} = require('../controllers/${controller.name}.js');\n`;
  });

  ast.validators.forEach((validator: any) => {
    content += `const ${validator.name} = require('../validators/${validator.name}.js');\n`;
  });

  content += '\n';

  ast.controllers.forEach((controller: any) => {
    content += `  const _${controller.name} = new ${controller.name}.default();\n`;
  });

  ast.validators.forEach((validator: any) => {
    content += `  const _${validator.name} = new ${validator.name}.default();\n`;
  });

  content += '\nmodule.exports = {\n';

  Object.keys(schemas).forEach((schema: string) => {
    content += `  ${schema}: {\n`;

    schemas[schema].forEach((resolver: any) => {
      content += `    ${resolver.name}: async (...params) => {\n`;

      if (content.includes(`_${resolver.context}Validator`)) {
        if (!resolver.isReference) {
          content += `     _${resolver.context}Validator.${resolver.name} && await _${resolver.context}Validator.${resolver.name}(...params);\n`;
        }
      }

      let functionName = resolver.name;
      if (resolver.isReference) {
        functionName = `get${capitalize(resolver.name)}By${resolver.type}`;
      }

      content += `      return _${resolver.context}Controller.${functionName}(...params);\n`;
      content += `    },\n`;
    });

    content += `  },\n`;
  });
  content += '};';

  return content;
};

const ast = read();
console.log(write(ast));

export default () => {};
