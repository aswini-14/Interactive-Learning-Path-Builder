const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Accepts either a single role (string) or multiple roles (array)
const authenticate = (allowedRoles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      // Log the decoded token for debugging
      console.log("Decoded token:", decoded);

      // Ensure user_id and role exist in the token payload
      if (!decoded?.id || !decoded?.role) {
        return res.status(400).json({ error: 'Token is missing user_id or role' });
      }

      // Normalize allowedRoles to array for flexibility
      const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

      // Log the role check
      console.log("Allowed roles:", rolesArray, "User role:", decoded.role);

      if (rolesArray.length > 0 && !rolesArray.includes(decoded.role)) {
        return res.status(403).json({ error: 'Permission denied', role: decoded.role });
      }

      next();
    } catch (err) {
      console.error('Error verifying token:', err);
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

module.exports = authenticate;
