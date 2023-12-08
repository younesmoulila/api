// eslint-disable-next-line import/extensions
const db = require('./db_conf.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const jwtSecret = 'ilovemysushi!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h




async function addUser (login)  {
  const stmtInsert = db.prepare(
    'INSERT INTO clients (nom,prenom,adresse,email,mdp) VALUES (?,?,?,?,?)',
  );
  const hashedPassword = await bcrypt.hash(login.mdp, saltRounds);
  const info = stmtInsert.run(login.nom, login.prenom, login.adresse,login.email, hashedPassword);
};

module.exports.createOneUser= async (login) =>{
    await addUser(login);
    const email=login.email;
    const token = jwt.sign(
      { email }, // session data added to the payload (payload : part 2 of a JWT)
      jwtSecret, // secret used for the signature (signature part 3 of a JWT)
      { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
    );
  
    const authenticatedUser = {
      email,
      token,
    };
  
    return authenticatedUser;
}

module.exports.emailExists = (email) => {
  const stmtCheckEmail = db.prepare('SELECT COUNT(*) as count FROM clients WHERE email = ?');
  const emailExists = stmtCheckEmail.get(email);
  return emailExists.count > 0;
}

module.exports.getOneUser = (email) => {
  const stmtGetUser = db.prepare('SELECT * FROM clients WHERE email = ?');
  const user = stmtGetUser.get(email);
  return user;
}
