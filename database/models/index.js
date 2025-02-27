import { readdirSync } from 'fs';
import { fileURLToPath ,pathToFileURL} from 'url';
import path, { join, dirname } from 'path';
import { Sequelize } from 'sequelize';
import fs from 'fs';

// ✅ Fix for Windows: Convert absolute path to file:// URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = path.basename(__filename);  // Corrected basename usage
const env = process.env.NODE_ENV || 'development';

// ✅ Read the config.json file synchronously
const configFile = JSON.parse(fs.readFileSync(join(__dirname, '../../config/config.json'), 'utf-8'));
const dbConfig = configFile[env];

const db = {};

let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

// ✅ Load models dynamically
const modelFiles = readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && (file.endsWith('.js') || file.endsWith('.cjs')));

for (const file of modelFiles) {
  const modelPath = pathToFileURL(join(__dirname, file)).href;
  const { default: modelInit } = await import(modelPath);
  const model = modelInit(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Set up associations if present
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
console.log("db",db);

export default db;


// import { readdirSync } from 'fs';
// import { fileURLToPath, pathToFileURL } from 'url';
// import path, { join, dirname, basename as _basename } from 'path';
// import { Sequelize } from 'sequelize';
// import configFile from '../../config/config.json';

// // ✅ Fix for Windows: Convert absolute path to file:// URL
// const __filename = fileURLToPath(import.meta.url);
// const _dirname = dirname(_filename);

// const basename = basename(_filename);
// const env = process.env.NODE_ENV || 'development';
// const dbConfig = configFile[env];

// const db = {};

// let sequelize;
// if (dbConfig.use_env_variable) {
//   sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
// } else {
//   sequelize = new Sequelize(
//     dbConfig.database,
//     dbConfig.username,
//     dbConfig.password,
//     dbConfig
//   );
// }

// // ✅ Fix: Convert Windows paths to file:// URLs when using import
// const modelFiles = readdirSync(__dirname)
//   .filter(file => file.indexOf('.') !== 0 && file !== basename && file.endsWith('.js') || file.endsWith('.cjs'));

// for (const file of modelFiles) {
//   const modelPath = pathToFileURL(join(__dirname, file)).href; // Convert path to file URL
//   const { default: modelInit } = await import(modelPath);
//   const model = modelInit(sequelize, Sequelize.DataTypes);
//   db[model.name] = model;
// }

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // console.log("db",db)

// export default db;

// import fs from 'fs';
// import path from 'path';
// import { Sequelize } from 'sequelize'; 
// import process from 'process';
// import { fileURLToPath } from 'url';

// // Get the current file name and directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';

// // Use fs to read the config.json file synchronously
// const configFilePath = path.resolve(__dirname, '../../config/config.json');
// const configFile = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
// const config = configFile[env];

// const db = {};

// // Initialize Sequelize connection
// const sequelize = config.use_env_variable
//   ? new Sequelize(process.env[config.use_env_variable], config)
//   : new Sequelize(config.database, config.username, config.password, config);

// // Read all model files and initialize them
// fs.readdirSync(__dirname)
//   .filter(file => (
//     file.indexOf('.') !== 0 &&
//     file !== basename &&
//     file.endsWith(".js") ||  file.endsWith(".cjs") // && !file.includes('.test.js')
//   ))
//   .forEach(file => {
//     import(path.join(__dirname, file))
//       .then(({ default: model }) => {
//         db[model.name] = model(sequelize, Sequelize.DataTypes);
//       })
//       .catch(err => {
//         console.error(`Error loading model from file ${file}:`, err);
//       });
//   });

// // Set up associations after models are loaded
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
// console.log("db",db); 
// export default db;  // Export the db object





// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(path.join(__dirname, '..', '..', 'config', 'config.json'))[env]; 
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => (
//     file.indexOf('.') !== 0 &&
//     file !== basename &&
//     file.slice(-3) === '.js' &&
//     file.indexOf('.test.js') === -1
//   ))
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;






