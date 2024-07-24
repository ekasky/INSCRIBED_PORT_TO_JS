const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { registerController } = require('../controllers/registerController');
const { validateRegister } = require('../validators/registerValidator');
const User = require('../models/User');
const argon2 = require('argon2');

jest.mock('../models/User');
jest.mock('argon2');

const app = express();
app.use(bodyParser.json());
app.post('/api/register', validateRegister, registerController);

describe('POST /api/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 201 if user is successfully created', async () => {
    User.findOne.mockResolvedValueOnce(null); // No username conflict
    User.findOne.mockResolvedValueOnce(null); // No email conflict
    argon2.hash.mockResolvedValue('hashedpassword');
    User.prototype.save = jest.fn().mockResolvedValue(true);

    const res = await request(app)
      .post('/api/register')
      .send({
        firstName: 'Evan',
        lastName: 'Kasky',
        email: 'ekasky25@gmail.com',
        username: 'ekasky',
        password: 'Password'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('User successfully created');
  });

  it('should return 400 if validation fails', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        firstName: '',
        lastName: '',
        email: 'invalidemail',
        username: '',
        password: ''
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('Input validation error');
  });

  it('should return 409 if username or email is taken', async () => {
    User.findOne.mockResolvedValueOnce({ username: 'ekasky' }); // Username conflict
    User.findOne.mockResolvedValueOnce({ email: 'ekasky25@gmail.com' }); // Email conflict

    const res = await request(app)
      .post('/api/register')
      .send({
        firstName: 'Evan',
        lastName: 'Kasky',
        email: 'ekasky25@gmail.com',
        username: 'ekasky',
        password: 'Password'
      });

    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toEqual('Registration unsuccessful');
    expect(res.body.errors).toEqual([
      { msg: 'Username is taken' },
      { msg: 'Email is taken' }
    ]);
  });

  it('should return 500 if there is a server error', async () => {
    User.findOne.mockRejectedValueOnce(new Error('Server error'));

    const res = await request(app)
      .post('/api/register')
      .send({
        firstName: 'Evan',
        lastName: 'Kasky',
        email: 'ekasky25@gmail.com',
        username: 'ekasky',
        password: 'Password'
      });

    expect(res.statusCode).toEqual(500);
    expect(res.body.message).toEqual('Server Error. Please try again later.');
  });
});
