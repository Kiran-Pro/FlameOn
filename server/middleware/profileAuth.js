import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //if token is not available

  if (!authHeader) {
    return res.status(401).json({ message: "No Token Available" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoder = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoder;
    //To let in
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

export default protect;
