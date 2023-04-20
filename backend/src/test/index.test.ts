import request from 'supertest';
import express from 'express';

const app = express();

app.get('/test', (req, res) => {
  res.json('test ook');
});

describe('GET /test', () => {
  it('should return the string "test ook"', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.body).toEqual('test ook');
  });
});