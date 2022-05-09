import app from './app'
import config from './config'
import logger from './logger'

app.listen(config.port, ()=>{
    logger.info(`🚀 ${config.name} ${config.version} 🚀`)
    logger.info(`🚀 Listening on ${config.port} with NODE_ENV=${config.nodeEnv} 🚀`)
})