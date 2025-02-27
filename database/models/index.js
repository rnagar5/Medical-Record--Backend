
import dotenv from 'dotenv';
import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path, { join, dirname } from 'path';
import { Sequelize } from 'sequelize';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const dbConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT || 'postgres'
};

const db = {};

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const modelFiles = readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && (file.endsWith('.js') || file.endsWith('.cjs')));

for (const file of modelFiles) {
  const modelPath = pathToFileURL(join(__dirname, file)).href;
  const { default: modelInit } = await import(modelPath);
  const model = modelInit(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
console.log("db", db);

export default db;
