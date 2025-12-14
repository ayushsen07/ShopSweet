const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/user');
require('dotenv').config(); 

// Connect to a test database before running tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// Clean up database after each test
afterEach(async () => {
  await User.deleteMany();
});

// Close connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/auth/register', () => {
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });

  it('should not register a user with an existing email', async () => {
    // Create a user first
    await User.create({
      name: 'Existing User',
      email: 'test@example.com',
      password: 'password123'
    });

    // Try to register again with same email
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });
});





describe('POST /api/auth/login', () => {
  it('should login a user with valid credentials', async () => {
    // 1. Create a user manually in the DB so we have someone to log in
    await User.create({
      name: 'Login User',
      email: 'login@example.com',
      password: 'password123'
    });

    // 2. Try to login with those credentials
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: 'password123'
      });
    
    // 3. Expect success
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('email', 'login@example.com');
  });

  it('should not login with invalid password', async () => {
    // 1. Create a user
    await User.create({
      name: 'Login User',
      email: 'login@example.com',
      password: 'password123'
    });

    // 2. Try to login with WRONG password
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'login@example.com',
        password: 'wrongpassword'
      });

    // 3. Expect failure (Unauthorized)
    expect(res.statusCode).toEqual(401);
  });
});