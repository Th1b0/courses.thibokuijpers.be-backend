const connection = require("../../config/db");

class User {
  static create(username, email, hash, method) {
    const sqlQuery = `insert into users (username, email, hash, auth_method) values (?,?,?,?)`;
    return new Promise((resolve, reject) => {
      connection.query(
        sqlQuery,
        [username, email, hash, method],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  static get(username) {
    const sqlQuery = `select 1 from users where username= ?`;
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  static login(username) {
    const sqlQuery = `select user_id, hash from users where username=?`;
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [username], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

class Session {
  static create(session_id, user_id, expires, ip_address, device_id) {
    const sqlQuery = `insert into sessions (session_id, user_id, expires, ip_adress, device_id, valid) values (?,?,?,?,?,?)`;
    return new Promise((resolve, reject) => {
      connection.query(
        sqlQuery,
        [session_id, user_id, expires, ip_address, device_id, true],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }

  static get(session_id, ip_address, device_id) {
    const sqlQuery = `SELECT * FROM sessions WHERE session_id = ? AND ip_adress = ? AND device_id = ? AND expires > NOW() AND valid = true`;
    return new Promise((resolve, reject) => {
      connection.query(
        sqlQuery,
        [session_id, ip_address, device_id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  }
  static invalidate(session_id, device_id) {
    const sqlQuery = `UPDATE sessions SET valid = false WHERE session_id = ? AND device_id = ?`;
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [session_id, device_id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = { User, Session };
