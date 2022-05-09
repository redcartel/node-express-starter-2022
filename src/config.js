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
    origin: process.env['ORIGIN'] ?? 'none',
    requestMax: process.env['REQUEST_MAX'] ?? 1000
}

export default config