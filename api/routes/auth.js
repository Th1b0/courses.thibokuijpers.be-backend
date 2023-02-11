const { AuthController } = require("../controllers/authController");
const authenticate = require("../middleware/authCheck");

const router = require("express").Router();

router.get("/", authenticate, AuthController.auth);
router.post("/create", AuthController.create);
router.post("/login", AuthController.login);
router.delete("/logout", authenticate, AuthController.logout);

module.exports = router;
