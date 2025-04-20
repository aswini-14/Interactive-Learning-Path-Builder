const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (roles = []) => {
  return (req, res, next) => {
    console.log("Authenticate Middleware Hit");
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      req.user = decoded;
      next();
    });
  };
};

module.exports = authenticate;
