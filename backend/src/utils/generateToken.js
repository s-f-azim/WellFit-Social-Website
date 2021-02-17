import JWT from "jsonwebtoken";

//generate a json web token given a user id
const generateToken = (id) =>
  JWT.sign({ sub: id }, process.env.JWT_SECRET, { expiresIn: "30d" });

export default generateToken;
