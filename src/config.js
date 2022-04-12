const config = {
    port: parseInt(process.env['PORT'] ?? 3000),
    nodeEnv: process.env['NODE_ENV'] ?? 'development'
}

export default config;