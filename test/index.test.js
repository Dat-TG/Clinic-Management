
const request = require('supertest');
const app = require('../server');
const {client}=require('../model/Database.m');

afterAll(async () => {
    await client.close(); // Close the connection to the database when testing is done
});

describe('Index Page', () => {
    it('should return 200 OK', (done) => {
        request(app).get('/').expect(200, done);
    });
});


