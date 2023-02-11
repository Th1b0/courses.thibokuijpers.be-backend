const { Session } = require("../models");

const authenticate = async (req, res, next) => {
  const session_id = req.signedCookies.session_id;
  const device_id = req.signedCookies.device_id;
  const ip_adress = req.ip;
  console.log(req.signedCookies);
  if (!session_id || !device_id)
    return res.status(401).json({
      status: "error",
      data: {
        message: "You are not allowed to view this resource",
        code: 401,
      },
    });
  else {
    try {
      const [getSession] = await Session.get(session_id, ip_adress, device_id);

      try {
        if (getSession.session_id === session_id) {
          req.user_id = getSession.user_id;
          req.session_id = session_id;
          req.device_id = device_id;
          return next();
        } else {
          return res.status(401).json({
            status: "error",
            data: {
              message: "You are not allowed to view this resource",
              code: 401,
            },
          });
        }
      } catch (error) {
        return res.status(401).json({
          status: "error",
          data: {
            message: "You are not allowed to view this resource",
            code: 401,
          },
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        data: { message: "Internal server error", code: 500 },
      });
    }
  }
};

module.exports = authenticate;
