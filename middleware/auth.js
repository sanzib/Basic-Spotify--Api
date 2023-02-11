import jwt from "jsonwebtoken";

const tokenAuth = (req, res, next) => {
  const token = req.header("x-auth-token");
  // console.log(token);
  if (!token)
    return res.status(400).json({ messasge: "Access denied , no token found" });
  jwt.verify(token, process.env.JWTPRIVATEKEY, (error, validToken) => {
    if (error) {
      return res.status(400).json({ message: "Invalid Token" });
    } else {
      req.user = validToken;
      // console.log(req.user);
      next();
    }
  });
};
export default tokenAuth;
