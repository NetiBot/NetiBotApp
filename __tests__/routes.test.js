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
        __v: 0,
        createdAt: expect.any(String),
        _id: expect.any(String),
        diagnosis: expect.any(String),
        treatment: expect.any(String),
        updatedAt: expect.any(String),
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
<<<<<<< Updated upstream
  afterAll(async () => {
    // await pool.end();
=======
  it('UPDATE /webmds/:id updates a diagnosis and treatment', async () => {
    const res = await request(app)
      .put('/webmds/62d87221e08c9882c1d2c2f3')
      .send({ diagnosis: 'Test', treatment: 'Test Again' });
    console.log('res', res);
    expect(res.status).toBe(200);
    expect(res.body.diagnosis).toBe('Test');
    expect(res.body.treatment).toBe('Test Again');
>>>>>>> Stashed changes
  });
});
