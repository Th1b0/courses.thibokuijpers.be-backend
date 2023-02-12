const { v4: uuidv4 } = require("uuid");
const { Password } = require("../middleware/passwordHash");
const { User, Session } = require("../models/index");
const { Validate } = require("../helper/dataValidation");

class AuthService {
  static async create(username, email, password) {
    try {
      const validateUsername = await Validate.username(username);
      if (!validateUsername)
        return {
          status: "error",
          data: { message: "Name does not follow guidelines", code: 400 },
        };
      const validateEmail = await Validate.email(email);
      if (!validateEmail) {
        return {
          status: "error",
          data: { message: "Email does not follow guidelines", code: 400 },
        };
      }
      const validatePassword = await Validate.password(password);
      if (!validatePassword) {
        return {
          status: "error",
          data: { message: "Password does not follow guidelines", code: 400 },
        };
      }
      const existingUser = await User.get(username);
      if (existingUser.length === 0) {
        const hash = await Password.hash(password);
        await User.create(username, email, hash, "email");
        return {
          status: "success",
          data: { message: "User created successfully", code: 200 },
        };
      }
      return {
        status: "error",
        data: { message: "Username already in use", code: 400 },
      };
    } catch (error) {
      return {
        status: "error",
        data: { message: "Error creating user", code: 500 },
      };
    }
  }

  static async login(username, password, ip_adress) {
    try {
      const validateSpecialChar = await Validate.specialChar(username);
      if (!validateSpecialChar)
        return {
          status: "error",
          data: { message: "Username cant contains special chars", code: 400 },
        };
      const [getUserHashId] = await User.login(username);
      try {
        const userId = getUserHashId.user_id;
        const hash = getUserHashId.hash;
        const isMatch = await Password.compare(password, hash);
        if (isMatch) {
          const expires = new Date(Date.now() + 2592000000);
          const session_id = uuidv4();
          const device_id = uuidv4();
          await Session.create(
            session_id,
            userId,
            expires,
            ip_adress,
            device_id
          );
          return {
            status: "success",
            data: { session_id: session_id, device_id: device_id, code: 200 },
          };
        }
        return {
          status: "error",
          data: { message: "Incorrect username or password", code: 401 },
        };
      } catch (error) {
        return {
          status: "error",
          data: { message: "Incorrect username or password", code: 401 },
        };
      }
    } catch (error) {
      return {
        status: "error",
        data: { message: "Error logging in", code: 500 },
      };
    }
  }

  static async logout(session_id, device_id) {
    try {
      await Session.invalidate(session_id, device_id);
      return {
        status: "success",
        data: { message: "Logged out successfully", code: 200 },
      };
    } catch (error) {
      return {
        status: "error",
        data: { message: "Error logging out", code: 500 },
      };
    }
  }
}
module.exports = { AuthService };
