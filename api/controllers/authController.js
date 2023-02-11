const { AuthService } = require("../services/authServices");

class AuthController {
  static async auth(req, res) {
    res.json({
      status: "success",
      data: { message: "authenticated", code: 200 },
    });
  }

  static async create(req, res) {
    const { username, email, password } = req.body;
    try {
      const result = await AuthService.create(username, email, password);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        status: "error",
        data: { message: "Internal server error" },
        code: 500,
      });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    const ip_adress = req.ip;
    try {
      const result = await AuthService.login(username, password, ip_adress);

      if (result.status != "error") {
        res.cookie("session_id", result.data.session_id, {
          httpOnly: true,
          maxAge: 2592000000,
          SameSite: "strict",
          signed: true,
        });
        res.cookie("device_id", result.data.device_id, {
          httpOnly: true,
          maxAge: 2592000000,
          SameSite: "strict",
          signed: true,
        });
        res.json({
          status: "success",
          data: { message: "authenticated", code: 200 },
        });
      } else {
        res.status(result.data.code).json(result);
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        data: { message: "Internal server error" },
        code: 500,
      });
    }
  }

  static async logout(req, res) {
    try {
      const result = await AuthService.logout(
        req.signedCookies.session_id,
        req.signedCookies.device_id
      );
      res.clearCookie("session_id").clearCookie("device_id").json(result);
    } catch (error) {
      res.status(500).json({
        status: "error",
        data: { message: "Internal server error" },
        code: 500,
      });
    }
  }
}

module.exports = { AuthController };
