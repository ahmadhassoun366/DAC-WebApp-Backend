import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

// Simulated user data
const users = [
  { 
    _id: "12345", 
    name: "John Doe", 
    email: "johndoe@example.com", 
    password: bcrypt.hashSync("123456", 8) 
  }
  // Add more mock users as needed
];

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Signup Controller
export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // Add new user to the array (simulating database)
  const newUser = {
    _id: new Date().getTime().toString(), 
    name, 
    email, 
    password: bcrypt.hashSync(password, 8)
  };
  users.push(newUser);
  const token = createToken(newUser._id);
  res.status(201).json({ data: newUser, token });
});

// Login Controller
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !(bcrypt.compareSync(password, user.password))) {
    res.status(401).json({ message: "Incorrect email or password" });
    return;
  }
  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});

// Protect Middleware
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    res.status(401).json({ message: "Not logged in" });
    return;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = users.find(u => u._id === decoded.userId);
  if (!user) {
    res.status(401).json({ message: "User not found" });
    return;
  }
  req.user = user;
  next();
});