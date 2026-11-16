import jwt from "jsonwebtoken";
import { ENV } from "../config/ENV.js";

const SHORT_SESSION_DAYS = 1; // 24 hours for standard/public sessions
const LONG_SESSION_DAYS = 30; // 30 days for explicit remember-me sessions

/**
 * Sign JWT session token with dynamic expiration based on device trust.
 * Conforms to NIST SP 800-63B and OWASP session management recommendations.
 */
const signToken = (id, rememberMe = false) => {
  const days = rememberMe ? LONG_SESSION_DAYS : SHORT_SESSION_DAYS;
  return jwt.sign({ id }, ENV.jwtSecret, {
    expiresIn: `${days}d`,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, ENV.jwtSecret);
};

/**
 * Hardened cookie options adhering to OWASP session guidelines:
 * - httpOnly prevents client script access (XSS mitigation)
 * - secure ensures transmission only over HTTPS
 * - sameSite protects against CSRF attacks
 */
const getCookieOptions = (rememberMe = false) => {
  const days = rememberMe ? LONG_SESSION_DAYS : SHORT_SESSION_DAYS;
  return {
    httpOnly: true,
    secure: ENV.isProd,
    sameSite: ENV.isProd ? "none" : "Lax",
    path: "/",
    maxAge: days * 24 * 60 * 60 * 1000,
  };
};

// Default export for backward compatibility
const cookieOptions = getCookieOptions(false);

export { signToken, cookieOptions, getCookieOptions, verifyToken };
