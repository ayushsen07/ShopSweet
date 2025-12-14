require('dotenv').config();
const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/user');
const Sweet = require('../src/models/sweet');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await Sweet.deleteMany();
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/sweets', () => {
  
  // Helper to get a valid token before running tests
  beforeEach(async () => {
    const user = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      isAdmin: true
    });
    
    // Login to get token
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'password123' });
      
    token = res.body.token;
  });

  it('should create a new sweet if authorized', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${token}`) // <--- Sending the token!
      .send({
        name: 'Dark Chocolate Truffle',
        category: 'Chocolate',
        price: 3.50,
        quantity: 50
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Dark Chocolate Truffle');
  });

  it('should fail if no token is provided', async () => {
    const res = await request(app)
      .post('/api/sweets')
      .send({
        name: 'Ghost Candy',
        category: 'Mystery',
        price: 1.00,
        quantity: 10
      });

    expect(res.statusCode).toEqual(401); // Unauthorized
  });
});

describe('GET /api/sweets', () => {
  beforeEach(async () => {
    await Sweet.create([
      { name: 'Chocolate Bar', category: 'Chocolate', price: 5, quantity: 10 },
      { name: 'Gummy Bears', category: 'Gummy', price: 3, quantity: 20 },
      { name: 'Lollipop', category: 'Hard Candy', price: 1, quantity: 50 }
    ]);
  });

  it('should get all sweets', async () => {
    const res = await request(app)
      .get('/api/sweets')
      .set('Authorization', `Bearer ${token}`); // <--- ADDED THIS LINE
      
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(3);
  });

  it('should search sweets by name', async () => {
    const res = await request(app)
      .get('/api/sweets/search?query=Bear')
      .set('Authorization', `Bearer ${token}`); // <--- ADDED THIS LINE

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Gummy Bears');
  });
});



describe('Admin Operations', () => {
  let adminToken;
  let userToken;
  let sweetId;

  beforeEach(async () => {
    // 1. Create Admin
    const admin = await User.create({
      name: 'Admin',
      email: 'admin_test@example.com',
      password: 'password123',
      isAdmin: true // <--- Important
    });
    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin_test@example.com', password: 'password123' });
    adminToken = adminRes.body.token;

    // 2. Create Regular User
    const user = await User.create({
      name: 'Regular',
      email: 'regular@example.com',
      password: 'password123',
      isAdmin: false
    });
    const userRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'regular@example.com', password: 'password123' });
    userToken = userRes.body.token;

    // 3. Create a Sweet
    const sweet = await Sweet.create({
      name: 'To Delete',
      category: 'Test',
      price: 5,
      quantity: 10
    });
    sweetId = sweet._id;
  });

  it('should allow Admin to delete a sweet', async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should NOT allow regular User to delete a sweet', async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(403); // Forbidden
  });
});