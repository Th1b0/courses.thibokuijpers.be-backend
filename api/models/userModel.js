const connection = require("../../config/db");
class Account {
  static changeUsername(userId, username) {
    const sqlQuery = `UPDATE users SET username = ? WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [username, userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  static changeEmail(userId, email) {
    const sqlQuery = `UPDATE users SET email = ? WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [email, userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  static changePassword(userId, hash) {
    const sqlQuery = `UPDATE users SET hash = ? WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [hash, userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  static delete(userId) {
    const sqlQuery = `DELETE FROM users WHERE user_id = ?`;
    return new Promise((resolve, reject) => {
      connection.query(sqlQuery, [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
