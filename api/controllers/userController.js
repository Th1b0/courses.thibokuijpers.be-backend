const { UserServices } = require("../services/userServices");
class UserController {
  static async changeUsername(req, res) {
    try {
      const username = req.body.username;
      const userId = req.user_id;
      const change = await UserServices.changeUsername(userId, username);
    } catch (error) {}
  }
  static async changeEmail(req, res) {
    try {
      const email = req.body.email;
      const userId = req.user_id;
      const change = await UserServices.changeEmail(userId, email);
    } catch (error) {}
  }
  static async changePassword(req, res) {
    try {
      const password = req.body.password;
      const userId = req.user_id;
      const change = await UserServices.changePassword(userId, password);
    } catch (error) {}
  }
  static async deleteAccount(req, res) {
    try {
      const userId = req.user_id;
      const change = await UserServices.deleteAccount(userId);
    } catch (error) {}
  }
}
