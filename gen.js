const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Path to the swagger.yaml file
const yamlPath = path.join(__dirname, 'api', 'swagger.yaml');

// Path to output swagger.json file
const jsonPath = path.join(__dirname, 'swagger.json');

// Read the YAML file
const yamlContent = fs.readFileSync(yamlPath, 'utf8');

// Convert YAML to JSON
const jsonContent = yaml.load(yamlContent);

// Write the JSON content to swagger.json
fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2), 'utf8');

console.log('swagger.json has been generated successfully.');

