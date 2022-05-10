import logger from '../../utils/logger'

/**
 * Test error endpoint
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getError = () => {
    logger.debug('throwing error on purpose')
    throw new Error('test error')
}

export default getError