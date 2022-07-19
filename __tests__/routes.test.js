const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../server');
// const Webmd = require('../lib/models/Webmd');

jest.mock('../lib/controllers/webmds');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /webmds retrieves a random diagnosis and treatment', async () => {
    const res = await request(app).get('/webmds');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      diagnosis: expect.any(String),
      treatment: expect.any(String),
    });
  });
  afterAll(async () => {
    await pool.end();
  });
});
