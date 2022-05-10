import app from '../app';
import supertest from 'supertest';
import config from '../config';
import { cookieIsSet, cookieIsNotSet, authWrap, postWithCSRF } from './testHelpers/cookieHelper';

describe('user login and logout returns secure results', () => {
    test('post user returns 401 for missing password', async () => {
        const result = await postWithCSRF(app, '/user', {
            email: config.adminUsername
        })
        expect(result.statusCode).toEqual(400)
    })

    test('post user returns null token and unset cookie for bad email', async () => {
        const result = await postWithCSRF(app, '/user', {
            email: 'bad@email.com',
            password: config.adminPassword
        })
        expect(result.statusCode).toEqual(200)
        expect(result.body.token).toBeNull()
        expect(cookieIsSet(result, 'authCookie', null))
    })

    test('post user returns null token and unset cookie for bad password', async () => {
        const result = await postWithCSRF(app, '/user', {
            email: config.adminUsername,
            password: 'badPassword'
        })
        expect(result.statusCode).toEqual(200)
        expect(result.body.token).toBeNull()
        expect(cookieIsSet(result, 'authCookie', null))
    })

    test('post user returns 200 for good password & email', async () => {
        const result = await postWithCSRF(app, '/user', {
            email: config.adminUsername,
            password: config.adminPassword
        })
        expect(result.statusCode).toEqual(200)
        expect(result.body.token).toBeTruthy()
        expect(cookieIsSet(result, 'authCookie'))
    })

    test('post user sets cookie for good password & email', async () => {
        const result = await supertest(app).post('/user').send({
            email: config.adminUsername,
            password: config.adminPassword
        })
        expect(cookieIsSet(result, 'authCookie', config.authCookie))
    })

    test('get logout unsets cookie', async() => {
        const result = await supertest(app).get('/user/logout')
        expect(cookieIsSet(result, 'authCookie', null))
    })

    test('get user info returns 401 for no auth', async () => {
        const result = await supertest(app).get('/user')
        expect(result.statusCode).toEqual(401)
        expect(cookieIsNotSet(result, 'authCookie'))
    })

    test('get user info returns 401 for bad token and no cookie', async () => {
        const result = await supertest(app).get('/user').set({
            Authorization: 'Bearer badToken'
        })
        expect(result.statusCode).toEqual(401)
        expect(cookieIsNotSet(result, 'authCookie'))
    })

    test('get user info returns 401 for good token and no cookie', async () => {
        const result = await supertest(app).get('/user').set(
            'Authorization', `Bearer ${config.sessionToken}`
        )
        expect(result.statusCode).toEqual(401)
        expect(cookieIsNotSet(result, 'authCookie'))
    })

    test('get user info returns 401 for good cookie and no token', async () => {
        const result = await supertest(app).get('/user').set(
            'Cookie', `authCookie=${config.authCookie}`
        )
        expect(result.statusCode).toEqual(401)
        expect(cookieIsNotSet(result, 'authCookie'))
    })

    test('user info returns 200 and json for good cookie', async () => {
        const result = await authWrap(supertest(app).get('/user'))
        expect(result.statusCode).toEqual(200)
        expect(result.body.email).toBeTruthy()
    })

    test('user info returns 200 and new token for old token and good cookie', async () => {
        const result = await supertest(app).get('/user').set(
            'Authorization', `Bearer ${config.oldSessionToken}`
        ).set(
            'Cookie', `authCookie=${config.authCookie}`
        )
        expect(result.statusCode).toEqual(200)
        expect(result.body.token).toBe(config.sessionToken)
        expect(cookieIsSet(result, 'authCookie', config.authCookie))
    })
})