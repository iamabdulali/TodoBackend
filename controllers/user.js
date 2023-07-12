import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/features.js";

export const home = (req, res) => {
  res.send("WORKING");
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json({
    success: true,
    users: users,
  });
};

export const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });

  res.status(201).cookie("token", 123).json({
    success: true,
    message: "Registered",
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User Already Exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  setCookie(user, res, "Registered Successfully", 201);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exists",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email Or Password",
    });
  }

  setCookie(user, res, `Welcome back ${user.name}`);
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_DEV == "Development" ? "lax" : "none",
      secure: process.env.NODE_DEV == "Development" ? false : true,
    })
    .json({
      success: true,
      message: "You're Logged Out",
    });
};

export const getUserById = async (req, res) => {
  res.status(200).json({
    success: true,
    user: res.user,
  });
};
