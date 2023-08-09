import { app } from '@shared/infrastructure/http/app';
import request from 'supertest';

let authToken = '';

describe('User controller', () => {
  beforeEach(async () => {
    const response = await request(app).post('/sessions').send({
      email: 'test@test.com',
      password: '123@456',
    });

    authToken = response.body.token;
  });

  it('should be able create user session', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'test@test.com',
      password: '123@456',
    });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should not be able authenticated user by email not exists', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'user_not_exists@test.com',
      password: '123@456',
    });

    expect(response.status).toEqual(401);
  });

  it('should not be able authenticated user by password invalid', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'test@test.com',
      password: 'pass_invalid',
    });

    expect(response.status).toEqual(401);
  });

  it('should ble able capture information user logged', async () => {
    const response = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body).toHaveProperty('id');
  });

  it('should not ble able capture information user, is not logged in ', async () => {
    const response = await request(app).get('/users/me');
    expect(response.status).toEqual(401);
  });

  it('should be able the create an new user ', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'User Saler',
        email: 'saler2@saler.com',
        password: '123@345',
        is_admin: false,
      })
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able the create an new user, email already exists', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'User Saler',
        email: 'saler2@saler.com',
        password: '123@345',
        is_admin: false,
      })
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.body.message).toEqual('E-mail already exists');
  });

  it('should not be able create new user, user is not administrator', async () => {
    const { body } = await request(app).post('/sessions').send({
      email: 'saler2@saler.com',
      password: '123@345',
    });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'User is Not Admin',
        email: 'user_not_admin@test.com',
        password: '123@345',
        is_admin: false,
      })
      .set('Authorization', `Bearer ${body.token}`);

    expect(response.body.message).toEqual(
      'Access denied. Only admins allowed.',
    );
  });
});
