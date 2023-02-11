const bcrypt = require("bcrypt");

class Password {
  static async hash(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 12);
    return hash;
  }
  static async compare(plainTextPassword, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
      return isMatch;
    } catch (error) {}
  }
}
module.exports = { Password };
