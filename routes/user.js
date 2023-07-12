import express from "express";
import {
  createNewUser,
  getAllUsers,
  getUserById,
  home,
  login,
  logout,
  register,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", home);

router.get("/all", getAllUsers);

router.get("/me", isAuthenticated, getUserById);

router.get("/logout", logout);

router.post("/new", createNewUser);

router.post("/register", register);

router.post("/login", login);

export default router;
