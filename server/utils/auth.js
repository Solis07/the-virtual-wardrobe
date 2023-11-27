const jwt = require("jsonwebtoken");

const secret = "mysecretsshhhhh";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    // console.log('req.headers.authorization:', req.headers.authorization);
    
    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    // console.log('token', token);

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      // console.log(token);
      const { data } = jwt.verify(token, secret, { maxAge: expiration });

      // console.log('data', data);

      req.user = data;
      // console.log('Decoded user:', req.user);

    } catch (error) {
      console.log(error);
      return req;
    }
    
    return req;
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
