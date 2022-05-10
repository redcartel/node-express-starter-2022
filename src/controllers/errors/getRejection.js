import logger from '../../utils/logger';

/**
 * Test rejection endpoint
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getRejection = async () => {
    logger.debug('rejecting promise on purpose')
    await new Promise((_resolve, reject)=> {
        reject();
    })
}

export default getRejection;