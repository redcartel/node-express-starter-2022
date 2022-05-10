import app from '../app';
import config from '../config';
import supertest from 'supertest';
import { getCSRF, postWithCSRF } from './testHelpers/cookieHelper';
import logger from '../utils/logger';

describe('site data is retrieved and set', () => {
    test('get data returns site data', async () => {
        const result = await supertest(app).get('/data')
        expect(result.statusCode).toEqual(200)
        expect(result.body.title).toBeTruthy()
        expect(result.body.description).toBeTruthy()
    })

    test('post data returns error if not authed', async () => {
        const result = await supertest(app).post('/data').send({
            title: 'New title'
        })
        expect(result.statusCode).toBe(401)
    })

    test('post data returns error if no csrf token', async() => {
        const result = await supertest(app).post('/data').send({
            title: 'New title'
        }).set(
            'Authorization', `Bearer ${config.sessionToken}`
        ).set(
            'Cookie', `authCookie=${config.authCookie}`
        )
        expect(result.statusCode).toBe(403)
    })

    test('post data updates with auth & csrf', async() => {
        const { cookie, token } = await getCSRF(app)
        logger.debug(JSON.stringify({cookie, token}))
        const result = await postWithCSRF(app, '/data', {
            title: 'New title',
            description: 'New description'
        }, true)
        expect(result.statusCode).toBe(200)
        expect(result.body.title).toBe('New title')
        expect(result.body.description).toBe('New description')
    })

    test('post data updates just title with auth & csrf', async() => {
        const { cookie, token } = await getCSRF(app)
        logger.debug(JSON.stringify({cookie, token}))
        const result = await postWithCSRF(app, '/data', {
            title: 'New title 2',
        }, true)
        expect(result.statusCode).toBe(200)
        expect(result.body.title).toBe('New title 2')
        expect(result.body.description).toBeTruthy()
    })

    test('post data updates just description with auth & csrf', async() => {
        const { cookie, token } = await getCSRF(app)
        logger.debug(JSON.stringify({cookie, token}))
        const result = await postWithCSRF(app, '/data', {
            description: 'New description 2',
        }, true)
        expect(result.statusCode).toBe(200)
        expect(result.body.title).toBeTruthy()
        expect(result.body.description).toBe('New description 2')
    })

    test('get site visit count returns a number', async () => {
        const result = await supertest(app).get('/data/count')
        expect(result.body.count.type === 'number')
    })

    test('post site visit count without csrf returns 403', async () => {
        const result = await supertest(app).post('/data/count').send({
            inc: 1
        })
        expect(result.status).toBe(403)
    })

    test('post site visit count with csrf but no inc returns 400', async () => {
        const result = await postWithCSRF(app, '/data/count', {})
        expect(result.status).toBe(400)
    })

    test('post site visit count with csrf and inc=1 returns 200', async () => {
        const result = await postWithCSRF(app, '/data/count', {inc: 1})
        expect(result.status).toBe(200)
    })
})