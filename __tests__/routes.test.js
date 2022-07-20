const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('backend-express-template routes', () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true });
  });
  it.skip('GET /webmds retrieves a random diagnosis and treatment', async () => {
    const res = await request(app).get('/webmds');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        _id: expect.any(String),
        diagnosis: expect.any(String),
        treatment: expect.any(String),
      },
    ]);
  });
  it('POST /webmds creates a new diagnosis and treatment', async () => {
    const res = await request(app)
      .post('/webmds')
      .send({ diagnosis: 'Test', treatment: 'Test Again' });
    expect(res.status).toBe(200);
    expect(res.body.diagnosis).toBe('Test');
    expect(res.body.treatment).toBe('Test Again');
  });
  afterAll(async () => {
  });
});