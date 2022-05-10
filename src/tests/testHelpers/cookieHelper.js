import supertest from "supertest";
import config from '../../config';

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

/**
 * Confirm that a cookie is not being set
 * @param result 
 * @param {string} name 
 * @returns 
 */
export const cookieIsNotSet = (result, name) => {
    for (let cookieString of result.headers['set-cookie'] ?? []) {
        if (cookieString.indexOf(`${name}=`) > -1) {
            return false;
        }
    }
    return true;
}

/**
 * Confirm that a cookie's domain property is the given url
 * @param result 
 * @param {string} url 
 * @returns 
 */
export const cookieDomainIsSet = (result, url) => {
    for (let cookieString of result.headers['set-cookie'] ?? []) {
        if (cookieString.indexOf(`Domain=${url};`)) {
            return true;
        }
    }
    return false;
}

/**
 * Retrieve the value of a cookie
 * @param result 
 * @param name 
 * @returns 
 */
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

/**
 * Get the csrf cookie and token
 * @param app 
 * @param {string} path 
 * @returns 
 */
export const getCSRF = async (app, path="/csrf") => {
    const result = await supertest(app).get(path)
    let cookie =  getCookieValue(result, '_csrf')
    let token = getCookieValue(result, 'XSRF-TOKEN')
    return { cookie, token }
}

/**
 * Make a POST request with CSRF cookie & token and optionally Auth cookie & header
 * @param app 
 * @param {string} path 
 * @param {any} values 
 * @param {boolean} auth 
 * @returns 
 */
export const postWithCSRF = async (app, path, values, auth=false) => {
    const { cookie, token } = await getCSRF(app)
    const _bearer = auth ? `Bearer ${config.sessionToken}` : 'Bearer'
    const _cookie = auth ? `authCookie=${config.authCookie};_csrf=${cookie};` : `_csrf=${cookie};`
    const _values = { ...values, _csrf: token}

    const call = supertest(app).post(path).send(_values).set('Cookie', _cookie).set('Authorization', _bearer)
    return call
}

/**
 * Wrap a call to super(app).METHOD in with the authorization cookie & header
 * @param call 
 * @param {string} additionalCookies 
 * @returns 
 */
export const authWrap = (call, additionalCookies='') => {
    call.set('Cookie', `authCookie=${config.authCookie};`+additionalCookies).set('Authorization').set('Authorization', `Bearer ${config.sessionToken}`);
    return call
}