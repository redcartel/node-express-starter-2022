import supertest from "supertest";
import config from '../../config';
import logger from "../../utils/logger";

/**
 * check if a cookie is being set
 * @param result
 * @param {string} name
 * @param {string} value
 */
export const cookieIsSet = (result, name, value) => {
    for (let cookieString of result.headers['set-cookie'] ?? []) {
        if (cookieString.indexOf(`${name}=`) > -1) {
            if (value === null) {
                if (cookieString.indexOf(`${name}=;`) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (value !== undefined) {
                if (cookieString.indexOf(`=${value}`) > -1) {
                    return true
                }
                else {
                    return false
                }
            }
            else {
                return true
            }
        }
    }
    return false
}

export const cookieIsNotSet = (result, name) => {
    for (let cookieString of result.headers['set-cookie'] ?? []) {
        if (cookieString.indexOf(`${name}=`) > -1) {
            return false;
        }
    }
    return true;
}

export const cookieDomainIsSet = (result, url) => {
    for (let cookieString of result.headers['set-cookie'] ?? []) {
        if (cookieString.indexOf(`Domain=${url};`)) {
            return true;
        }
    }
    return false;
}

export const getCookieValue = (result, name) => {
    for (let cookieString of result.headers['set-cookie'] ?? []) {
        if (cookieString.indexOf(`${name}=`) > -1) {
            const match = cookieString.match(/\w+=([^;]*);/)
            if (!match || !match[1] || match[1].length === 0) {
                return null
            }
            return match[1]
        }
    }
    return undefined;
}

export const getCSRF = async (app, path="/csrf") => {
    const result = await supertest(app).get(path)
    let cookie =  getCookieValue(result, '_csrf')
    let token = getCookieValue(result, 'XSRF-TOKEN')
    return { cookie, token }
}

export const postWithCSRF = async (app, path, values, auth=false) => {
    const { cookie, token } = await getCSRF(app)
    const _bearer = auth ? `Bearer ${config.sessionToken}` : 'Bearer'
    const _cookie = auth ? `authCookie=${config.authCookie};_csrf=${cookie};` : `_csrf=${cookie};`
    const _values = { ...values, _csrf: token}

    const call = supertest(app).post(path).send(_values).set('Cookie', _cookie).set('Authorization', _bearer)
    return call
}

export const authWrap = (call, cookies='') => {
    call.set('Cookie', `authCookie=${config.authCookie};`+cookies).set('Authorization').set('Authorization', `Bearer ${config.sessionToken}`);
    return call
}