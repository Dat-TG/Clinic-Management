
const request = require('supertest');
const app = require('../server');

const {client}=require('../model/Database.m');

afterAll(async () => {
    if (client) {
        // Close the connection to the database when testing is done
        await client.close(); 
    }
});

describe('Index Page', () => {
    it('Should return 200 OK', (done) => {
        request(app).get('/').expect(200, done);
    });
});


