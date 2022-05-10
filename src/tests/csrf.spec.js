import app from '../app';
import supertest from 'supertest';
import { cookieIsSet, getCookieValue } from './testHelpers/cookieHelper';

describe('csrf endpoint sets _csrf cookie', () => {
    test('get csrf sets _csrf cookie', async () => {
        const result = await supertest(app).get('/csrf')
        expect(result.statusCode).toEqual(200)
        expect(cookieIsSet(result, '_csrf'))
        expect(getCookieValue(result, '_csrf')).toBeTruthy()
    })
})