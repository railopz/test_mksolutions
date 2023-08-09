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

  it('should not be able list one product', async () => {
    const hash = uuid();
    const response = await request(app)
      .get(`/products/${hash}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body.status).toEqual('error');
  });

  it('should be able create new product', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        name: 'New Product',
        description: 'New product sale',
        price: 10.5,
      })
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able create product, is name already exist', async () => {
    await request(app)
      .post('/products')
      .send({
        name: 'test name exist',
        description: 'New product sale',
        price: 10.5,
      })
      .set('Authorization', `Bearer ${authToken}`);

    const response = await request(app)
      .post('/products')
      .send({
        name: 'test name exist',
        description: 'New product sale',
        price: 10.5,
      })
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body.status).toEqual('error');
  });

  it('should be able updated product', async () => {
    const { body } = await request(app)
      .post('/products')
      .send({
        name: 'Test Updated Product',
        description: 'Test Updated Product',
        price: 10.5,
      })
      .set('Authorization', `Bearer ${authToken}`);

    const response = await request(app)
      .patch(`/products/${body.id}`)
      .send({
        name: 'UPDATE SUCCESS',
        description: 'Test Updated Product',
        price: 10.5,
      })
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body.name).toEqual('UPDATE SUCCESS');
  });

  it('should not be able updated product, name already exist', async () => {
    const { body } = await request(app)
      .post('/products')
      .send({
        name: 'UPDATE ERROR',
        description: 'Not update product',
        price: 10.5,
      })
      .set('Authorization', `Bearer ${authToken}`);

    const response = await request(app)
      .patch(`/products/${body.id}`)
      .send({
        name: 'UPDATE SUCCESS',
        description: 'Test Updated Product',
        price: 10.5,
      })
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body.status).toEqual('error');
  });

  it('should be able delete product', async () => {
    const { body } = await request(app)
      .post('/products')
      .send({
        name: 'TEST REMOVE PRODUCT',
        description: 'PRODUCT REMOVE',
        price: 10.5,
      })
      .set('Authorization', `Bearer ${authToken}`);

    const response = await request(app)
      .delete(`/products/${body.id}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body.status).toEqual('success');
  });

  it('should not be able remove product', async () => {
    const hash = uuid();
    const response = await request(app)
      .delete(`/products/${hash}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toEqual(404);
  });

  it('should be able list all products', async () => {
    const response = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body).not.toHaveLength(0);
  });

  it('should be able manager stock to product', async () => {
    const { body } = await request(app)
      .post('/products')
      .send({
        name: 'Test Manager Product',
        description: 'Test Manager Product',
        price: 10.5,
      })
      .set('Authorization', `Bearer ${authToken}`);

    const input = await request(app)
      .post(`/products/stock/manager/${body.id}`)
      .send({
        quantity: 10,
        type: 'Input',
      })
      .set('Authorization', `Bearer ${authToken}`);

    const output = await request(app)
      .post(`/products/stock/manager/${body.id}`)
      .send({
        quantity: 20,
        type: 'Output',
      })
      .set('Authorization', `Bearer ${authToken}`);

    expect(input.body).toHaveProperty('id');
    expect(output.body.status).toEqual('error');
  });
});
