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


