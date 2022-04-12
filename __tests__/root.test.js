import { expect } from '@jest/globals';
import supertest from 'supertest';
import app from '../src/app.js';

test('root returns environment', async ()=>{
    const result = await supertest(app).get('/');
    expect(result.statusCode).toEqual(200);
    expect(result.body.NODE_ENV).toEqual('test');
})