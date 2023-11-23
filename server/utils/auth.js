const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
// 'expiration' at '2h' for testing purposes:
const expiration = "2h";

module.exports = {
  // Added 'res' and 'next' to 'authMiddleware: function':
  // Could be written as 'authMiddleware: function ({ req, res }, next) {'
  authMiddleware: function ({ req, res }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;

    } catch {
      console.log("Invalid token");
      return res.status(401).json({ message: "invalid token!" });
    }
    
    return req;
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
