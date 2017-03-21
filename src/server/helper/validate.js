var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');
var cookie = require('cookie');

module.exports.auth = (req, res, next) => {

  // Parse the cookies on the request
  var cookies = cookie.parse(req.headers.cookie || '');

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || cookies.tembo_access_token;

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, String(config.secret), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
}
