// eslint-disable-next-line import/no-extraneous-dependencies
const Database = require('better-sqlite3');
const config = require('../config');

const db = new Database(config.dbPath);
module.exports = db;
