import dotenv from 'dotenv';
dotenv.config()
import packageJson from '../package.json';

/**
 * Pattern for config is:
 * key: process.env['KEY'] ?? default
 */
const config = {
    version: packageJson.version,
    name: packageJson.name,
    description: packageJson.description,

    nodeEnv: process.env['NODE_ENV'] ?? 'development',
    port: process.env['PORT'] ?? 3000,
    adminUsername: process.env['ADMIN_USERNAME'] ?? undefined,
    adminPassword: process.env['ADMIN_PASSWORD'] ?? undefined,
    sessionToken: process.env['SESSION_TOKEN'] ?? undefined,
    oldSessionToken: process.env['OLD_TOKEN'] ?? undefined,
    authCookie: process.env['AUTH_COOKIE'] ?? undefined,

    csurfMiddleware: {
        cookie: {
            domain: process.env['NODE_ENV'] === 'production' ? (process.env['ORIGIN'] ?? 'none') : '*',
            httponly: true
        }
    },

    corsMiddleware: {
        origin: process.env['NODE_ENV'] === 'production' ? (process.env['ORIGIN'] ?? 'none') : '*'
    },

    rateLimitMiddleware: {
        windowMs: 10 * 60 * 1000,
        max: process.env['NODE_ENV'] === 'production' ? (process.env['REQUEST_MAX'] ?? 1000) : 999999999,
        standardHeaders: true,
        legacyHeaders: false
    }
}

export default config