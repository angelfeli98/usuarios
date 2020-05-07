var jwt = require('jsonwebtoken');
var config = require('./config');


function verifyToken(req, res, next) {
    var token = req.params.token;
    if (!token)
      token = req.body.token;


    if (!token)
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token 20.' });
      // if everything good, save to request for use in other routes
      req.usuarioId = decoded.id;
      next();
    });
}
module.exports = verifyToken;
