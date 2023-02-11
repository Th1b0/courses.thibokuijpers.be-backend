class validate {
  static username(username) {
    return new Promise((resolve, reject) => {
      if (!username || username.trim() === "") {
        resolve(false);
      }

      if (username.length < 3 || username.length > 16) {
        resolve(false);
      }

      const re = /^[a-zA-Z0-9_.]+$/;
      if (!re.test(username)) {
        resolve(false);
      }

      resolve(true);
    });
  }
  static email(email) {
    return new Promise((resolve, reject) => {
      if (!email || email.trim() === "") {
        resolve(false);
      }

      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) {
        resolve(false);
      }

      resolve(true);
    });
  }
  static password(password) {
    return new Promise((resolve, reject) => {
      if (!password || password.trim() === "") {
        resolve(false);
      }

      if (password.length < 10) {
        resolve(false);
      }

      resolve(true);
    });
  }
  static specialChar(input) {
    return new Promise((resolve, reject) => {
      if (!input || input.trim() === "") {
        resolve(false);
      }

      const re = /[^A-Za-z0-9._@]/;
      if (re.test(input)) {
        resolve(false);
      }

      resolve(true);
    });
  }
}
module.exports = { validate };
