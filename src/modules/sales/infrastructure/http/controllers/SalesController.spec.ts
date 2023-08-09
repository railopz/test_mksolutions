import { app } from '@shared/infrastructure/http/app';
import { v4 as uuid } from 'uuid';
import request from 'supertest';

let authToken = '';

describe('Sale Controller', () => {
  beforeEach(async () => {
    const response = await request(app).post('/sessions').send({
      email: 'test@test.com',
      password: '123@456',
    });

    authToken = response.body.token;
  });

  it('should be able create sale', async () => {
    const product1 = await request(app)
      .post('/products')
      .send({
        name: 'TESTE SALE',
        description: 'SALE PRODUCT',
        price: 10.5,
      })
      .set('Authorization', `Bearer ${authToken}`);

    const response = await request(app)
      .post('/sales')
      .send({
        transactions: [
          {
            product_id: product1.body.id,
            quantity: 10,
          },
        ],
      })
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body).toHaveProperty('hash');
    expect(response.body).toHaveProperty('qrcode');
    expect(response.body).toHaveProperty('transactions');
  });
});
