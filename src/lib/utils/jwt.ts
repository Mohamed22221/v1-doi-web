import { decodeJwt, type JWTPayload } from "jose";

/**
 * Interface representing the structure of our custom JWT payload.
 * Includes standard claims (exp, iat, sub) and custom application claims.
 */
export interface CustomJwtPayload extends JWTPayload {
  /** User role (e.g., 'buyer', 'seller', 'admin') */
  role?: string;
  /** Subject (usually the User ID) */
  sub?: string;
  /** Expiration time (seconds since Unix epoch) */
  exp?: number;
  /** Issued at time (seconds since Unix epoch) */
  iat?: number;
  /** Any other custom fields from the API */
  [key: string]: unknown;
}

/**
 * Decodes a JWT token without verifying the signature.
 * Safe for use in Edge Runtime (Middleware) and Client/Server components.
 *
 * @param token - The JWT string to decode
 * @returns The decoded payload if valid, otherwise null
 */
export function decodeUserToken(token: string): CustomJwtPayload | null {
  if (!token) return null;

  try {
    return decodeJwt(token) as CustomJwtPayload;
  } catch (_error) {
    return null;
  }
}

/**
 * Checks if a JWT token has expired based on its 'exp' claim.
 *
 * @param token - The JWT string to check
 * @returns true if the token is expired or invalid, false otherwise
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeUserToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  // Convert current time to seconds to match 'exp' claim (Unix epoch)
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}
