import { app } from '@shared/infrastructure/http/app';
import { v4 as uuid } from 'uuid';
import request from 'supertest';

let authToken = '';

describe('Product Controller', () => {
  beforeEach(async () => {
    const response = await request(app).post('/sessions').send({
      email: 'test@test.com',
      password: '123@456',
    });

    authToken = response.body.token;
  });

  it('should be able list one product', async () => {
    const { body } = await request(app)
      .post('/products')
      .send({
        name: 'test list one product',
        description: 'test list one product',
        price: 10.5,
      })
      .set('Authorization', `Bearer ${authToken}`);

    const response = await request(app)
      .get(`/products/${body.id}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body.name).toEqual(body.name);
  });
});
