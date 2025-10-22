import jwt from "jsonwebtoken"

function authToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ ok: false, message: "No token provided" });
    }
  
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ ok: false, message: "Token malformed" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error("JWT verify error:", error.message);
      return res.status(403).json({ ok: false, message: "Invalid or expired token" });
    }
  }
  

export default authToken