import os from 'os';
import path from 'path';
import Sequelize from 'sequelize';
import user from "./models/user.js";

const sequelize = new Sequelize('login-with-metamask-database', '', undefined, {
  dialect: 'sqlite',
  storage: path.join(os.tmpdir(), 'db.sqlite'),
  logging: false
});

const User = user(sequelize, Sequelize);

// Create new tables
sequelize.sync();

export { sequelize };