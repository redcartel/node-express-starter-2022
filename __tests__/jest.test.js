import supertest from 'supertest';
import app from '../src/app.js';

test('get the / endpoint', async ()=>{
    const res = supertest(app).get('/');
    expect(res.statusCode).toBe(200);
})