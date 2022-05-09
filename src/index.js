import app from './app'
import config from './config'
import getPort, { makeRange } from 'get-port'
import logger from './logger'

const findPort = async () => {
    if (config.nodeEnv === 'production') {
        return parseInt(config.port);
    }
    else {
        return await getPort({ port: makeRange(parseInt(config.port), parseInt(config.port) + 100) })
    }
}

findPort().then(port => {
    app.listen(port, () => {
        if (port !== parseInt(config.port)) {
            logger.warn(`🚨 port ${config.port} not available 🚨`);
        }
        logger.info(`🚀 ${config.name} ${config.version} 🚀`)
        logger.info(`🚀 Listening on ${port} with NODE_ENV=${config.nodeEnv} 🚀`)
    })
});