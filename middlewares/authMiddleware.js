const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = decoded;
    // console.log(req.user);
    next();
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.checkRole = (roles) => (req, res, next) => {
  // console.log(req.user.role);
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

exports.isSuperAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (user.role !== "super-admin") {
    return res.status(403).json({ error: "Access denied, not a super admin" });
  }
  next();
};
