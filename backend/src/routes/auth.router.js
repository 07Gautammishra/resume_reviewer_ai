import express from "express";
import {z} from "zod";

import asyncHandler from "../utils/asyncHandler.js";
import AuthMiddleware from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { authLimiter } from "../middleware/rateLimit.js";
import {
    register,
    login,
    logout,
    getCurrentUser,
    updateProfile,
    updatePassword,
    googleAuthRedirect,
    googleAuthCallback,
    githubAuthRedirect,
    githubAuthCallback,
} from "../controllers/auth.controller.js";

const router = express.Router();

const registerSchema = z.object({
    name: z.string().trim().min(1).max(80),
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password must be at most 100 characters long"),
});

const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(1).max(100),
});
const profileSchema = z.object({
    name: z.string().trim().min(1).max(80).optional(),
    avatar: z.string().trim().url().or(z.literal("")).optional(),
});

const passwordSchema = z.object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters long").max(100, "Current password must be at most 100 characters long"),
    newPassword: z.string().min(6, "New password must be at least 6 characters long").max(100, "New password must be at most 100 characters long"),
});

router.post("/register", authLimiter, validate(registerSchema, "body"), asyncHandler(register));
router.post("/login", authLimiter, validate(loginSchema, "body"), asyncHandler(login));
router.post("/logout", asyncHandler(logout));
router.get("/me", AuthMiddleware, asyncHandler(getCurrentUser));
router.patch("/profile", AuthMiddleware, validate(profileSchema, "body"), asyncHandler(updateProfile));
router.patch("/password", authLimiter, AuthMiddleware, validate(passwordSchema), asyncHandler(updatePassword));

// OAuth Routes
router.get("/google", asyncHandler(googleAuthRedirect));
router.get("/google/callback", asyncHandler(googleAuthCallback));
router.get("/github", asyncHandler(githubAuthRedirect));
router.get("/github/callback", asyncHandler(githubAuthCallback));

export default router;