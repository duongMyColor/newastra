// scripts/generateSchema.js
const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, '../prisma/models');
const schemaPath = path.join(__dirname, '../prisma/schema.prisma');

// Read the base schema file
let schema = fs.readFileSync(schemaPath, 'utf-8');

// Read each model file and append it to the schema
fs.readdirSync(modelsDir).forEach((file: File) => {
  const model = fs.readFileSync(path.join(modelsDir, file), 'utf-8');
  schema += '\n' + model;
});

// Write the combined schema back to the schema file
fs.writeFileSync(schemaPath, schema);
