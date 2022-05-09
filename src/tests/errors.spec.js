import app from '../app';
import supertest from 'supertest';

describe('error test endpoints return error codes & json', () => {
    test('404 & json returned from nonexistent route', async () => {
        const result = await supertest(app).get('/badPath')
        expect(result.statusCode).toEqual(404)
        expect(result.body.message).toBeTruthy()
    })

    test('500 & json returned from error route', async () => {
        const result = await supertest(app).get('/errors')
        expect(result.statusCode).toEqual(500)
        expect(result.body.message).toBeTruthy()
    })

    test('500 & json returned from promise rejection route', async () => {
        const result = await supertest(app).get('/errors/rejection')
        expect(result.statusCode).toEqual(500)
        expect(result.body.message).toBeTruthy()
    })
})