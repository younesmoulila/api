// eslint-disable-next-line import/extensions
const db = require('./db_conf.js');

function allOrders() {
  const allOrder = db.prepare('SELECT * FROM commandes').all();
  return allOrder;
}

function addSushi(sushi) {
  return db
    .prepare('INSERT INTO sushis (nom, description, prix_unitaire, type) VALUES (?, ?, ?, ?);')
    .run(sushi.nom, sushi.description, sushi.prix_unitaire, sushi.type);
}

module.exports = { allOrders, addSushi };
