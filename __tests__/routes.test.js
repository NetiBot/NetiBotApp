const request = require('supertest');
const app = require('../lib/app');
const mongoose = require('mongoose');

describe('backend-express-template routes', () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true });
  });
  it('GET /webmds retrieves a random diagnosis and treatment', async () => {
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
    //this portion is to clean up the database
    const del = await request(app)
      .delete(`/webmds/${res.body._id}`);
    expect(del.status).toBe(200);
  });
  it('UPDATE /webmds/:id updates a diagnosis and treatment', async () => {
    const create = await request(app)
      .post('/webmds')
      .send({ diagnosis: 'Test', treatment: 'Test Again' });
    expect(create.status).toBe(200);
    const res = await request(app)
      .put(`/webmds/${create.body._id}`)
      .send({ diagnosis: 'Test', treatment: 'Test Again' });
    expect(res.status).toBe(200);
    expect(res.body.diagnosis).toBe('Test');
    expect(res.body.treatment).toBe('Test Again');
    //this portion is to clean up the database
    const del = await request(app)
      .delete(`/webmds/${res.body._id}`);
    expect(del.status).toBe(200);
  });
  it('DELETE /webmds/:id deletes a diagnosis and treatment', async () => {
    const res = await request(app)
      .post('/webmds')
      .send({
        diagnosis: 'This will be deleted',
        treatment: 'This too',
      });
    expect(res.status).toBe(200);
    const response = await request(app)
      .delete(`/webmds/${res.body._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'conditions and treatments were deleted successfully!'
    );
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
});
