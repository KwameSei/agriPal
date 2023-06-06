import jwt from 'jsonwebtoken';
import { roles, permissions } from '../roles_permit.js'
import dotenv from 'dotenv';

dotenv.config();

// Middleware to check if user is authenticated and has the required role
const getAccessToRoutes = (requiredRole, requiredPermission) => {
  return (req, res, next) => {
    try {
      // Get token from request header
      let token = req.headers.authorization;

      // Check if token exists
      if (!token) {
        return res.status(403).json({ success: false, message: 'You are not authorized to access this route' });
      }

      // Verify token
      if (token && token.startsWith('Bearer')) {  // Check if token exists and starts with 'Bearer'
        // Remove 'Bearer ' from token
        token = token.split(' ')[1];
      }

      const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      req.user = verified; // Add user to request object

      // Check if user has the required role
      const { roles, permissions } = req.user;
      if (requiredRole && !roles.includes(requiredRole)) {
        return res.status(403).json({ success: false, message: 'You are not authorized to access this route' });
      } else if (requiredPermission && !permissions.includes(requiredPermission)) {
        return res.status(403).json({ success: false, message: 'You are not authorized to access this route' });
      } else {
        next();
      }
    } catch (error) {
      res.status(401).json({ success: false, error: error.message });
    }
  };
}

export default getAccessToRoutes;