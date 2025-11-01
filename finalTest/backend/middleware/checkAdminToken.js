// middleware/checkAdminToken.js
import jwt from "jsonwebtoken";

 function adminOnly(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ ok: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Kiểm tra role trong token
    if (decoded.role !== "admin") {
      return res.status(403).json({ ok: false, message: "Admin access required" });
    }

    // Gán thông tin cho request để controller có thể dùng
    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    res.status(401).json({ ok: false, message: "Invalid or expired token" });
  }
}
export default adminOnly