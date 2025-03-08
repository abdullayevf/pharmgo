import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res.status(401).json({ valid: false, message: 'No token provided' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (error) {
    return res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
};

export default authMiddleware;